using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Domain.Entities;
using ServiceHost.Logging.Interface;
using System.Threading.Tasks;

namespace ServiceHost.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ServiceFilter(typeof(ILogRepository))]
    public class RoleManagerController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> userManager;

        public RoleManagerController(RoleManager<IdentityRole> roleManager , UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            this.userManager = userManager;
        }
        [HttpGet]
        [Route("GetAllRoles")]
        public async Task<IActionResult> Index()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            return Ok(roles);
        }
        [HttpPost]
        [Route("AddRole")]
        public async Task<IActionResult> AddRole(string roleName)
        {
            if (roleName != null)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName.Trim()));
            }
            return RedirectToAction("Index");
        }
        [HttpDelete]
        [Route("DeleteRole/{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            IdentityRole result = await _roleManager.FindByIdAsync(id);
            var roleName = await _roleManager.GetRoleNameAsync(result);
            var userId = await userManager.GetUsersInRoleAsync(roleName);
            foreach (var item in userId)
            {
                await userManager.RemoveFromRoleAsync(item, roleName);
                await userManager.AddToRoleAsync(item, "User");
            }
            await _roleManager.DeleteAsync(result);
            return RedirectToAction("index");
        }
        [HttpGet]
        [Route("GetRole/{id}")]
        public async Task<IActionResult> FindRoleByID(string id)
        {
            IdentityRole result = await _roleManager.FindByIdAsync(id);
            return Ok(result);
        }
        [HttpPost]
        [Route("EditRole")]
        public async Task<IActionResult> EditRole(IdentityRole role)
        {
            IdentityRole model = await _roleManager.FindByIdAsync(role.Id);
            model.Name = role.Name;
            model.NormalizedName = role.Name.ToUpperInvariant();
            IdentityResult result = await _roleManager.UpdateAsync(model);
            return RedirectToAction("Index", result);
        }
    }
}
