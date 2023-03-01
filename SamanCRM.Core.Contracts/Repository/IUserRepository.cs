using Microsoft.AspNetCore.Identity;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IUserRepository
    {
        Task<ApplicationUser> GetByName(string username);
        Task<IList<string>> GetAllRoles(ApplicationUser userInfo);
        Task<bool> CheckPassword(ApplicationUser entity, string password);
        Task<IdentityResult> ChangePassword(ApplicationUser entity, string oldPassword, string newPassword);
        Task<string> Add(ApplicationUser entity, string Password);
        Task<string> AddRole(ApplicationUser entity, string role);
        Task<IdentityResult> Update(ApplicationUser entity);
        IEnumerable<ApplicationUser> GetAll();
        Task<IdentityResult> Delete(ApplicationUser entity);
    }
}
