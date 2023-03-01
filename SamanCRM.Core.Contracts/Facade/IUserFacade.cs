using Microsoft.AspNetCore.Identity;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IUserFacade
    {
        Task<UserDTO> GetByName(string username);
        Task<IList<string>> GetAllRoles(UserDTO userInfo);
        Task<bool> CheckPassword(UserDTO entity, string password);
        Task<IdentityResult> ChangePassword(UserDTO entity, string oldPassword, string newPassword);
        Task<string> Add(UserDTO entity, string password);
        string AddRole(ApplicationUser entity, string role);
        Task<IdentityResult> Update(UserDTO entity);
        Task<IdentityResult> Delete(UserDTO entity);
        public IEnumerable<UserDTO> GetAll();
    }
}
