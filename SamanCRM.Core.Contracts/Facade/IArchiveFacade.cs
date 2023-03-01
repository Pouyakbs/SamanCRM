using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IArchiveFacade
    {
        ArchiveDTO GetById(int id);
        IEnumerable<ArchiveDTO> GetAll();
        int Add(ArchiveDTO entity);
        void Remove(ArchiveDTO entity);
        void Update(ArchiveDTO entity);
    }
}
