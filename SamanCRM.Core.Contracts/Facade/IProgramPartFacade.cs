using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IProgramPartFacade
    {
        ProgramPartDTO GetById(int id);
        IEnumerable<ProgramPartDTO> GetAll();
        int Add(ProgramPartDTO entity);
        void Remove(ProgramPartDTO entity);
        void Update(ProgramPartDTO entity);
        IEnumerable<ProgramPartDTO> GetByRoleID(int id);
        void UpdateAccess(ProgramPartDTO entity);
    }
}
