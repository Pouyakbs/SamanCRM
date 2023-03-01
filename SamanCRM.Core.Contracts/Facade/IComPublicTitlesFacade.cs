using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IComPublicTitlesFacade
    {
        ComPublicTitlesDTO GetById(int id);
        IEnumerable<ComPublicTitlesDTO> GetAll();
        int Add(ComPublicTitlesDTO entity);
        void Remove(ComPublicTitlesDTO entity);
        void Update(ComPublicTitlesDTO entity);
    }
}
