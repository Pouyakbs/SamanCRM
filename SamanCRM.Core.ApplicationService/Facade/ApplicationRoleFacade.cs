using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ApplicationRoleFacade : IApplicationRoleFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ApplicationRoleFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ApplicationRoleDTO entity)
        {
            ApplicationRole applicationRoleDTO = mapper.Map<ApplicationRoleDTO, ApplicationRole>(entity);
            unitofWork.ApplicationRoles.Add(applicationRoleDTO);
            unitofWork.Save();
            return applicationRoleDTO.RoleID;
        }
        public IEnumerable<ApplicationRoleDTO> GetAll()
        {
            IEnumerable<ApplicationRole> applicationRoles = unitofWork.ApplicationRoles.GetAll();
            IEnumerable<ApplicationRoleDTO> applicationRolesDTO = mapper.Map<IEnumerable<ApplicationRole>, IEnumerable<ApplicationRoleDTO>>(applicationRoles);
            return applicationRolesDTO;
        }

        public ApplicationRoleDTO GetById(int id)
        {
            ApplicationRole applicationRole = unitofWork.ApplicationRoles.GetById(id);
            ApplicationRoleDTO applicationRoleDTO = mapper.Map<ApplicationRole, ApplicationRoleDTO>(applicationRole);
            return applicationRoleDTO;
        }

        public void Remove(ApplicationRoleDTO entity)
        {
            ApplicationRole applicationRoleDTO = mapper.Map<ApplicationRoleDTO, ApplicationRole>(entity);
            unitofWork.ApplicationRoles.Remove(applicationRoleDTO);
            unitofWork.Save();
        }

        public void Update(ApplicationRoleDTO entity)
        {
            ApplicationRole applicationRoleDTO = mapper.Map<ApplicationRoleDTO, ApplicationRole>(entity);
            ApplicationRoleDTO applicationRole = GetById(applicationRoleDTO.RoleID);
            applicationRoleDTO.CreatedDate = applicationRole.CreatedDate;
            unitofWork.ApplicationRoles.Update(applicationRoleDTO);
            unitofWork.Save();
        }
    }
}
