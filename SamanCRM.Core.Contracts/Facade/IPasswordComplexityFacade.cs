using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IPasswordComplexityFacade
    {
        PasswordComplexityDTO GetById(int id);
        IEnumerable<PasswordComplexityDTO> GetAll();
        int Add(PasswordComplexityDTO entity);
        void Remove(PasswordComplexityDTO entity);
        void Update(PasswordComplexityDTO entity);
    }

}
