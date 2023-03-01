using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Queries
{
    public class GetActivitiesByPersonnelQuery : IRequest<IEnumerable<ActivitiesDetail>>
    {
        public string EntityType { get; set; }
        public int PersonnelID { get; set; }
        public class GetActivitiesByPersonnelQueryHandler : IRequestHandler<GetActivitiesByPersonnelQuery, IEnumerable<ActivitiesDetail>>
        {
            private readonly IActivitiesFacade activitiesFacade;

            public GetActivitiesByPersonnelQueryHandler(IActivitiesFacade activitiesFacade)
            {
                this.activitiesFacade = activitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ActivitiesDetail>> Handle(GetActivitiesByPersonnelQuery query, CancellationToken cancellationToken)
            {
                var activityList = activitiesFacade.GetByPersonnel(query.EntityType , query.PersonnelID).ToList();
                if (activityList == null)
                {
                    return null;
                }
                return activityList.AsReadOnly();
            }
        }
    }
}
