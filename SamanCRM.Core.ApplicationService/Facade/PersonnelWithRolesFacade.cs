using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Core.Domain.Models;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class PersonnelWithRolesFacade : IPersonnelWithRolesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public PersonnelWithRolesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public IEnumerable<PersonnelsWithRolesDTO> GetAllPersonnelsWithRoles()
        {
            IEnumerable<PersonnelWithRoles> personnelWithRoles = unitofWork.PersonnelWithRoles.GetAllPersonnelsWithRoles();
            IEnumerable<PersonnelsWithRolesDTO> personnelWithRolesDTO = mapper.Map<IEnumerable<PersonnelWithRoles>, IEnumerable<PersonnelsWithRolesDTO>>(personnelWithRoles);
            return personnelWithRolesDTO;
        }
    }
}
