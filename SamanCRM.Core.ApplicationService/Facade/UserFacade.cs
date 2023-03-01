using AutoMapper;
using Microsoft.AspNetCore.Identity;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class UserFacade : IUserFacade
    {
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;

        public UserFacade(IMapper mapper, IUserRepository userRepository)
        {
            this.mapper = mapper;
            this.userRepository = userRepository;
        }
        public async Task<string> Add(UserDTO entity, string password)
        {
            ApplicationUser userDTO = mapper.Map<UserDTO, ApplicationUser>(entity);
            await userRepository.Add(userDTO, password);
            return userDTO.Id;
        }
        public Task<bool> CheckPassword(UserDTO entity, string password)
        {
            ApplicationUser userDTO = mapper.Map<UserDTO, ApplicationUser>(entity);
            Task<bool> CheckPass = userRepository.CheckPassword(userDTO, password);
            return CheckPass;
        }
        public Task<IdentityResult> ChangePassword(UserDTO entity, string oldPassword, string newPassword)
        {
            ApplicationUser userDTO = mapper.Map<UserDTO, ApplicationUser>(entity);
            Task<IdentityResult> ChangePass = userRepository.ChangePassword(userDTO, oldPassword, newPassword);
            return ChangePass;
        }
        public string AddRole(ApplicationUser entity, string role)
        {
            userRepository.AddRole(entity, role);
            return entity.Id;
        }

        public Task<IList<string>> GetAllRoles(UserDTO userInfo)
        {
            ApplicationUser user = mapper.Map<UserDTO, ApplicationUser>(userInfo);
            Task<IList<string>> UserRoles = userRepository.GetAllRoles(user);
            return UserRoles;
        }

        public Task<UserDTO> GetByName(string username)
        {
            Task<ApplicationUser> user = userRepository.GetByName(username);
            Task<UserDTO> userDTO = mapper.Map<Task<ApplicationUser>, Task<UserDTO>>(user);
            return userDTO;
        }

        public Task<IdentityResult> Update(UserDTO entity)
        {
            ApplicationUser userDTO = mapper.Map<UserDTO, ApplicationUser>(entity);
            return userRepository.Update(userDTO);
        }
        public Task<IdentityResult> Delete(UserDTO entity)
        {
            ApplicationUser userDTO = mapper.Map<UserDTO, ApplicationUser>(entity);
            return userRepository.Delete(userDTO);
        }

        public IEnumerable<UserDTO> GetAll()
        {
            IEnumerable<ApplicationUser> users = userRepository.GetAll();
            IEnumerable<UserDTO> usersDTO = mapper.Map<IEnumerable<ApplicationUser>, IEnumerable<UserDTO>>(users);
            return usersDTO;
        }
    }
}
