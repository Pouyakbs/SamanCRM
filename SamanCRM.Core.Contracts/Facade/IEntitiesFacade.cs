using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IEntitiesFacade
    {
        EntitiesDTO GetById(int id);
        IEnumerable<EntitiesDTO> GetAll();
        int Add(EntitiesDTO entity);
        void Remove(EntitiesDTO entity);
        void Update(EntitiesDTO entity);
    }
}
