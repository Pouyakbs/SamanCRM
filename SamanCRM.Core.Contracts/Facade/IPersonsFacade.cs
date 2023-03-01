using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IPersonsFacade
    {
        PersonsDTO GetById(int id);
        IEnumerable<PersonsDTO> GetAll();
        int Add(PersonsDTO entity);
        void Remove(PersonsDTO entity);
        void Update(PersonsDTO entity);
        IEnumerable<PersonsDTO> GetByAccountId(int id);
    }
}
