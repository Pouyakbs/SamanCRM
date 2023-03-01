using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IPersonnelFacade
    {
        PersonnelDTO GetById(int id);
        IEnumerable<PersonnelDTO> GetAll();
        int Add(PersonnelDTO entity);
        bool RoleExistance(int id);
        void Remove(PersonnelDTO entity);
        void Update(PersonnelDTO entity);
    }
}
