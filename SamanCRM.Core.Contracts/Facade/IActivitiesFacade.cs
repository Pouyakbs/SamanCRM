using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IActivitiesFacade
    {
        ActivitiesDTO GetById(int id);
        IEnumerable<ActivitiesDetail> GetAll(string entityType);
        int Add(ActivitiesDTO entity);
        void Remove(ActivitiesDTO entity);
        void Update(ActivitiesDTO entity);
        IEnumerable<ActivitiesDetail> GetByPersonnel(string entityType, int personnelID);
    }
}
