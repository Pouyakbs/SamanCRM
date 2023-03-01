using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using System.Net;
using SamanCRM.Core.Domain.Entities;
using ServiceHost.Models;
using SamanCRM.Shared.DomainModels.DTOs;
using SamanCRM.Core.Contracts.Facade;
using System.Text.RegularExpressions;
using SamanCRM.Core.ApplicationService.Features.PasswordComplexityFeatures.Commands;
using MediatR;
using ServiceHost.Logging.Interface;
using SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Queries;
using SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Queries;
using SamanCRM.Core.ApplicationService.Features.ApplicationRoleFeatures.Queries;

namespace ServiceHost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ILogRepository))]
    public class AuthenticateController : ControllerBase
    {
        private readonly IUserFacade userFacade;
        private readonly IPasswordComplexityFacade passwordComplexityFacade;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IMediator mediator;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;

        public AuthenticateController(IUserFacade userFacade, IPasswordComplexityFacade passwordComplexityFacade, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMediator mediator, UserManager<ApplicationUser> userManager)
        {
            this.userFacade = userFacade;
            this.passwordComplexityFacade = passwordComplexityFacade;
            this.roleManager = roleManager;
            this.mediator = mediator;
            this.userManager = userManager;
            this.configuration = configuration.GetSection("JwtSettings");
        }
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            var userIP = host.AddressList[1].ToString();
            var userAgent = HttpContext.Request.Headers["User-Agent"];
            var user = await userFacade.GetByName(model.Username);
            if (user.LockoutEnabled == false)
            {
                var isDisabled = new Response { Status = "Error", Message = "کاربر غیرفعال است" };
                return StatusCode(StatusCodes.Status500InternalServerError, isDisabled.Message);
            }
            else if (user.isRemoved == true)
            {
                var isRemoved = new Response { Status = "Error", Message = "کاربر وجود ندارد" };
                return StatusCode(StatusCodes.Status500InternalServerError, isRemoved.Message);
            };
            var checkResult = CheckUserSettings(user);
            if (await userFacade.CheckPassword(user, model.Password) && checkResult.Status == "Success")
            {
                var userRoles = await userFacade.GetAllRoles(user);
                var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name , user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti , Guid.NewGuid().ToString()),
                    };
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                List<ProgramPartDTO> programParts = new List<ProgramPartDTO>();
                var personnelDetail = await mediator.Send(new GetPersonnelByIdQuery { Id = user.PersonnelID });
                if (personnelDetail != null)
                {
                    programParts.AddRange(await mediator.Send(new GetProgramPartByRoleIDQuery { Id = personnelDetail.orgPost }));
                }
                var roleDetail = await mediator.Send(new GetApplicationRoleByIdQuery { Id = personnelDetail.orgPost });
                var token = CreateToken(authClaims);
                var refreshToken = GenerateRefreshToken();
                _ = int.TryParse(configuration["RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);
                user.PassiveExpiryTime = DateTime.Now.AddDays(user.PassivePermitDays);
                user.PassExpiryTime = DateTime.Now.AddDays(user.PassActiveDays);
                await userFacade.Update(user);
                return Ok(new
                {
                    id = personnelDetail.PersonnelID,
                    name = personnelDetail.Name,
                    surname = personnelDetail.Surname,
                    role = roleDetail.RoleName,
                    programParts = programParts.OrderBy(a => a.Priority),
                    username = user.UserName,
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        private Response CheckUserSettings(UserDTO user)
        {
            if (user == null) return new Response { Status = "Error", Message = "کاربر وجود ندارد" };
            if (user.PassActiveDays != 0 && user.PassExpiryTime <= DateTime.Now)
                return new Response { Status = "Error", Message = "حساب کاربر دراثر عدم تغییر کلمه عبور در زمان مقرر غیرفعال است" };
            if (user.PassivePermitDays != 0 && user.PassiveExpiryTime <= DateTime.Now)
                return new Response { Status = "Error", Message = "حساب کاربر در اثر عدم فعالیت غیر فعال است" };
            if (user.AccessFailedCount != 0 && user.AccessFailedCount > user.PassIncorrectNum)
                return new Response { Status = "Error", Message = "حساب کاربر در اثر اشتباه وارد کردن بیش از حد رمز عبور غیرفعال است" };
            return new Response { Status = "Success" };
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userFacade.GetByName(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "کاربر با مشخصات وارد شده وجود دارد" });
            var passwordComplexity = passwordComplexityFacade.GetAll().FirstOrDefault();
            if (passwordComplexity != null)
            {
                var checkResult = CheckPasswordComplexity(passwordComplexity, model.Password);
                if (checkResult.Status == "Error")
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, checkResult.Message);
                }
            }
            var host = Dns.GetHostEntry(Dns.GetHostName());
            var userIP = host.AddressList[1];
            ApplicationUser user = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                LockoutEnabled = false,
                PassActiveDays = 0,
                PassExpiryTime = DateTime.Now,
                PassIncorrectNum = 0,
                PassivePermitDays = 0,
                PassiveExpiryTime = DateTime.Now,
                RefreshTokenExpiryTime = DateTime.Now,
                UserName = model.Username,
                PersonnelID = model.PersonnelID,
                UserIP = userIP.ToString(),
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "ایجاد کاربر با خطا مواجه شد! لطفا پس از بررسی اطلاعات وارد شده، دوباره تلاش کنید" });
            return Ok(new Response { Status = "Success", Message = "کاربر با موفقیت ایجاد شد" });

        }
        [HttpPost]
        [Route("PasswordSettings")]
        public async Task<IActionResult> CreatePasswordComplexity(CreatePasswordComplexityCommand command)
        {
            ResponseViewModel<int> model = new ResponseViewModel<int>();
            try
            {
                model.Data = await mediator.Send(command);
            }
            catch (Exception ex)
            {
                model.AddError(ex.Message);
                return BadRequest(model);
            }

            return Created($"/api/passwordComplexity/{model.Data}", model);
        }
        [HttpPost]
        [Route("UserSettings")]
        public async Task<IActionResult> UpdateUserSettings(UserSettings model)
        {
            try
            {
                if (model.ChangeForAll)
                {
                    var users = userFacade.GetAll();
                    foreach (var user in users)
                    {
                        user.PassActiveDays = model.PassActiveDays;
                        user.PassIncorrectNum = model.PassIncorrectNum;
                        user.PassivePermitDays = model.PassivePermitDays;
                        await userFacade.Update(user);
                    }
                }
                else
                {
                    var specifiedUser = await userFacade.GetByName(model.Username);
                    specifiedUser.PassActiveDays = model.PassActiveDays;
                    specifiedUser.PassIncorrectNum = model.PassIncorrectNum;
                    specifiedUser.PassivePermitDays = model.PassivePermitDays;
                    await userFacade.Update(specifiedUser);
                }
            }
            catch
            {
                return Ok(new Response { Status = "Error", Message = "تغییر تنظیمات کاربر با خطا مواجه شد" });
            }
            return Ok(new Response { Status = "Success", Message = "تنظیمات کاربر با موفقیت تغییر یافت" });
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var result = userFacade.GetAll();
            if (result == null)
            {
                return BadRequest(new Response { Status = "Error", Message = "هیچ کاربری دریافت نشد" });
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("GetUserByUserName/{username}")]
        public async Task<IActionResult> GetUserByUserName(string username)
        {
            var user = await userFacade.GetByName(username);
            if (user == null)
            {
                return BadRequest(new Response { Status = "Error", Message = "هیچ کاربری دریافت نشد" });
            }
            return Ok(user);
        }
        private Response CheckPasswordComplexity(PasswordComplexityDTO passwordComplexity, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(password))
                {
                    return new Response { Status = "Error", Message = "رمز عبور را وارد نمایید" };
                }
                if (passwordComplexity != null)
                {
                    if (password.Length < passwordComplexity.PassLeastChar)
                    {
                        return new Response { Status = "Error", Message = "طول رمز عبور از حداقل کاراکتر مجاز کمتر است" };
                    }
                    if (password.Length > passwordComplexity.PassMaxChar)
                    {
                        return new Response { Status = "Error", Message = "طول رمز عبور از حداکثر کاراکتر مجاز بیشتر است" };
                    }
                    if (passwordComplexity.UseChar)
                    {
                        var match = Regex.Match(password, $@"[a-zA-Z]+");
                        if (!match.Success)
                        {
                            return new Response { Status = "Error", Message = "وارد کردن حداقل یک کاراکتر حروف الزامی است" };
                        }
                    }
                    if (passwordComplexity.UseSpecialChar)
                    {
                        var match = Regex.Match(password, $@"^(?=.*(_|[^\w])).+$");
                        if (!match.Success)
                        {
                            return new Response { Status = "Error", Message = "وارد کردن حداقل یک کاراکتر خاص الزامی است" };
                        }
                    }
                    if (passwordComplexity.UseDigit)
                    {
                        var match = Regex.Match(password, $@"[0-9]+");
                        if (!match.Success)
                        {
                            return new Response { Status = "Error", Message = "وارد کردن حداقل یک کاراکتر عددی الزامی است" };
                        }
                    }
                    if (string.IsNullOrEmpty(passwordComplexity.SpecialChar) == false)
                    {
                        var match = Regex.Match(password, $@"[*]+");
                        if (!match.Success)
                        {
                            return new Response { Status = "Error", Message = String.Format("وارد کردن حداقل یک کاراکتر خاص {0} الزامی است", passwordComplexity.SpecialChar) };
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                return new Response { Status = "Error", Message = ex.ToString() };
            }
            return new Response { Status = "Success" };
        }
        [HttpPost]
        [Route("adminRegister")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userFacade.GetByName(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Admin already exists!" });
            var host = Dns.GetHostEntry(Dns.GetHostName());
            var userIP = host.AddressList[1];
            ApplicationUser user = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                LockoutEnabled = false,
                PassActiveDays = 0,
                PassExpiryTime = DateTime.Now,
                PassIncorrectNum = 0,
                PassivePermitDays = 0,
                PassiveExpiryTime = DateTime.Now,
                RefreshTokenExpiryTime = DateTime.Now,
                UserName = model.Username,
                UserIP = userIP.ToString(),
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "ایجاد کاربر با خطا مواجه شد لطفا دوباره تلاش کنید" });

            if (!await roleManager.RoleExistsAsync(Roles.مدیرعامل.ToString()))
                await roleManager.CreateAsync(new IdentityRole(Roles.مدیرعامل.ToString()));
            if (!await roleManager.RoleExistsAsync(Roles.کاربر.ToString()))
                await roleManager.CreateAsync(new IdentityRole(Roles.کاربر.ToString()));
            if (await roleManager.RoleExistsAsync(Roles.مدیرعامل.ToString()))
            {
                userFacade.AddRole(user, Roles.مدیرعامل.ToString());
            }
            if (await roleManager.RoleExistsAsync(Roles.مدیرعامل.ToString()))
            {
                userFacade.AddRole(user, Roles.کاربر.ToString());
            }
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel == null)
            {
                return BadRequest("Invalid client request");
            }
            string accessToken = tokenModel.AccessToken;
            string refreshToken = tokenModel.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
            {
                return BadRequest("Invalid access token or refresh token");
            }

#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            string username = principal.Identity.Name;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.

            var user = await userFacade.GetByName(username);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid access token or refresh token");
            }

            var newAccessToken = CreateToken(principal.Claims.ToList());
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await userFacade.Update(user);

            return new ObjectResult(new
            {
                accessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                refreshToken = newRefreshToken
            });
        }
        [HttpDelete]
        [Route("DeleteUser/{username}")]
        public async Task<IActionResult> Delete(string username)
        {
            var user = await userFacade.GetByName(username);
            if (user == null) return BadRequest("Invalid username");
            await userFacade.Delete(user);
            return Ok(user.UserID);
        }
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var user = await userFacade.GetByName(model.Username);
            var checkPass = await userFacade.CheckPassword(user, model.OldPassword);
            if (!checkPass) return BadRequest(new Response { Status = "Error", Message = "لطفا پسوورد جدید وارد کنید" });
            if (model.NewPassword != model.ConfirmNewPassword) return BadRequest(new Response { Status = "Error", Message = "پسوورد جدید خود را دوباره وارد کنید" });
            var passwordComplexity = passwordComplexityFacade.GetAll().FirstOrDefault();
            if (passwordComplexity != null)
            {
                var checkResult = CheckPasswordComplexity(passwordComplexity, model.ConfirmNewPassword);
                if (checkResult.Status == "Error")
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, checkResult.Message);
                }
            }
            var result = await userFacade.ChangePassword(user, model.OldPassword, model.ConfirmNewPassword);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "خطایی در تغییر رمز عبور رخ داده است لطفا دوباره تلاش کنید" });
            };
            return Ok(new Response { Status = "Success", Message = "پسوورد با موفقیت تغییر یافت" });
        }
        [Authorize]
        [HttpPost]
        [Route("revoke/{username}")]
        public async Task<IActionResult> Revoke(string username)
        {
            var user = await userFacade.GetByName(username);
            if (user == null) return BadRequest("Invalid user name");

            user.RefreshToken = null;
            await userFacade.Update(user);

            return NoContent();
        }

        [Authorize]
        [HttpPost]
        [Route("revoke-all")]
        public async Task<IActionResult> RevokeAll()
        {
            var users = userFacade.GetAll();
            foreach (var user in users)
            {
                user.RefreshToken = null;
                await userFacade.Update(user);
            }

            return NoContent();
        }

        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Secret"]));
            _ = int.TryParse(configuration["TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: configuration["ValidIssuer"],
                audience: configuration["ValidAudience"],
                expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is JwtSecurityToken jwtSecurityToken && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                return principal;
            throw new SecurityTokenException("Invalid token");

        }
    }
}