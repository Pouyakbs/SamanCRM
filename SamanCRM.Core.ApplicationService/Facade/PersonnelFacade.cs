using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.EF;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class PersonnelFacade : IPersonnelFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;
        private readonly DemoContext context;

        public PersonnelFacade(IUnitOfWork unitofWork, IMapper mapper , DemoContext context)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
            this.context = context;
        }
        public int Add(PersonnelDTO entity)
        {
            Personnel personnelDTO = mapper.Map<PersonnelDTO, Personnel>(entity);
            ApplicationRole applicationRole = unitofWork.ApplicationRoles.GetById(personnelDTO.orgPost);
            List<PersonnelRole> personnelRole = new List<PersonnelRole>();
            // Add To Many to Many Table
            personnelRole.Add(new PersonnelRole() { RoleID = applicationRole.RoleID });
            personnelDTO.PersonnelRole = personnelRole;
            unitofWork.Personnel.Add(personnelDTO);
            unitofWork.Save();
            return personnelDTO.PersonnelID;
        }

        public IEnumerable<PersonnelDTO> GetAll()
        {
            IEnumerable<Personnel> personnels = unitofWork.Personnel.GetAll();
            IEnumerable<PersonnelDTO> personnelsDTO = mapper.Map<IEnumerable<Personnel>, IEnumerable<PersonnelDTO>>(personnels);
            return personnelsDTO;
        }
        public PersonnelDTO GetById(int id)
        {
            Personnel personnel = unitofWork.Personnel.GetById(id);
            PersonnelDTO personnelDTO = mapper.Map<Personnel, PersonnelDTO>(personnel);
            return personnelDTO;
        }
        public bool RoleExistance(int id)
        {
            // Check Role Existance
            bool existance = unitofWork.Personnel.RoleExistance(id);
            return existance;
        }

        public void Remove(PersonnelDTO entity)
        {
            Personnel personnelDTO = mapper.Map<PersonnelDTO, Personnel>(entity);
            unitofWork.Personnel.Remove(personnelDTO);
            unitofWork.Save();
        }

        public void Update(PersonnelDTO entity)
        {
            Personnel personnelDTO = mapper.Map<PersonnelDTO, Personnel>(entity);
            Personnel personnel = unitofWork.Personnel.GetPersonnelByID(personnelDTO.PersonnelID);
            ApplicationRole applicationRole = unitofWork.ApplicationRoles.GetById(personnelDTO.orgPost);
            // Remove From Many To Many Table
            var personnelRole = personnel.PersonnelRole.FirstOrDefault(x => x.RoleID == personnel.orgPost);
            personnel.PersonnelRole.Remove(personnelRole);
            context.Entry(personnelRole).State = EntityState.Deleted;
            context.SaveChanges();
            List<PersonnelRole> personnelRoles = new List<PersonnelRole>();
            // Add to Many to Many Table
            personnelRoles.Add(new PersonnelRole() { RoleID = applicationRole.RoleID, Personnel = personnelDTO });
            personnelDTO.PersonnelRole = personnelRoles;
            personnelDTO.CreatedDate = personnel.CreatedDate;
            unitofWork.Personnel.Update(personnelDTO);
            unitofWork.Save();
        }
    }
}
