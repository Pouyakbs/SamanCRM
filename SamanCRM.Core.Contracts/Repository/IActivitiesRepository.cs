using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Repository
{
    public interface IActivitiesRepository : IGenericRepository<Activities>
    {
        IEnumerable<Activities> GetAllActivities(string entityType);
        Activities GetActivityByID(int id);
        List<Activities> GetActivityByPersonnel(string entityType, int id);
    }
}
