using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Queries
{
    public class GetAllActivitiesQuery : IRequest<IEnumerable<ActivitiesDetail>>
    {
        public string EntityType { get; set; }
        public class GetAllActivitiesQueryHandler : IRequestHandler<GetAllActivitiesQuery, IEnumerable<ActivitiesDetail>>
        {
            private readonly IActivitiesFacade activitiesFacade;

            public GetAllActivitiesQueryHandler(IActivitiesFacade activitiesFacade)
            {
                this.activitiesFacade = activitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ActivitiesDetail>> Handle(GetAllActivitiesQuery query, CancellationToken cancellationToken)
            {
                var activityList = activitiesFacade.GetAll(query.EntityType).ToList();
                if (activityList == null)
                {
                    return null;
                }
                return activityList.AsReadOnly();
            }
        }
    }
}
