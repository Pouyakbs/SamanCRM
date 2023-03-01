using Microsoft.AspNetCore.Identity;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SamanCRM.Infrastructure.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UserRepository(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }
        public async Task<string> Add(ApplicationUser entity, string Password)
        {
            var result = await userManager.CreateAsync(entity, Password);
            if (result.Succeeded)
            {
                return entity.Id;
            }
            return "Error";
        }
        public async Task<IdentityResult> Delete(ApplicationUser entity)
        {
            return await userManager.DeleteAsync(entity);
        }

        public async Task<string> AddRole(ApplicationUser entity, string role)
        {
            await userManager.AddToRoleAsync(entity, role);
            return entity.Id;
        }

        public async Task<bool> CheckPassword(ApplicationUser entity, string password)
        {
            return await userManager.CheckPasswordAsync(entity, password);
        }
        public async Task<IdentityResult> ChangePassword(ApplicationUser entity, string oldPassword, string newPassword)
        {
            userManager.UserValidators.Clear();
            return await userManager.ChangePasswordAsync(entity, oldPassword, newPassword);
        }
        public IEnumerable<ApplicationUser> GetAll()
        {
            return userManager.Users.ToList();
        }

        public Task<IList<string>> GetAllRoles(ApplicationUser userInfo)
        {
            return userManager.GetRolesAsync(userInfo);
        }

        public async Task<ApplicationUser> GetByName(string username)
        {
            return await userManager.FindByNameAsync(username);
        }

        public async Task<IdentityResult> Update(ApplicationUser entity)
        {
            return await userManager.UpdateAsync(entity);
        }
    }
}
