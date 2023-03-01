using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface ISupportContractFacade
    {
        SupportContractDTO GetById(int id);
        IEnumerable<SupportContractDTO> GetAll();
        int Add(SupportContractDTO entity);
        void Remove(SupportContractDTO entity);
        void Update(SupportContractDTO entity);
        List<SupportContractDTO> GetByProgramPartId(int id);
    }
}
