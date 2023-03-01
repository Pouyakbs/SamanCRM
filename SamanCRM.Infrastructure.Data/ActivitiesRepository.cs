using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.Data.Common;
using SamanCRM.Infrastructure.EF;
using System.Collections.Generic;
using System.Linq;

namespace SamanCRM.Infrastructure.Data
{
    public class ActivitiesRepository : GenericRepository<Activities>, IActivitiesRepository
    {
        private readonly DemoContext context;

        public ActivitiesRepository(DemoContext Context) : base(Context)
        {
            context = Context;
        }
        public IEnumerable<Activities> GetAllActivities(string entityType)
        {
            return context.Activities.Where(a => a.EntityType == entityType).Include(a=>a.ActivitiesDetail).ToList();
        }
        public Activities GetActivityByID(int id)
        {
            return context.Activities.Where(a => a.ActivityID == id).Include(a=>a.ActivitiesDetail).FirstOrDefault();
        }
        public List<Activities> GetActivityByPersonnel(string entityType , int id)
        {
            return context.Activities.Where(a=>a.EntityType == entityType).Where(a => a.PersonnelID == id).Include(a=>a.ActivitiesDetail).ToList();
        }

    }
}
