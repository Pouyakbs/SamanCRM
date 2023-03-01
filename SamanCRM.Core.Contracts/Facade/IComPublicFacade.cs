using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IComPublicFacade
    {
        ComPublicDTO GetById(int id);
        IEnumerable<ComPublicDTO> GetAll();
        int Add(ComPublicDTO entity);
        void Remove(ComPublicDTO entity);
        void Update(ComPublicDTO entity);
        List<ComPublicDTO> GetByProgramPartId(int id);
    }
}
