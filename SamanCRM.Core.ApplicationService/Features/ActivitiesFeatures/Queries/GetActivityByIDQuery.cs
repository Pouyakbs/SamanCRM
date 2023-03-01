using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Queries
{
    public class GetActivityByIdQuery : IRequest<ActivitiesDTO>
    {
        public int Id { get; set; }
        public class GetActivityByIdQueryHandler : IRequestHandler<GetActivityByIdQuery, ActivitiesDTO>
        {
            private readonly IActivitiesFacade activitiesFacade;

            public GetActivityByIdQueryHandler(IActivitiesFacade activitiesFacade)
            {
                this.activitiesFacade = activitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ActivitiesDTO> Handle(GetActivityByIdQuery query, CancellationToken cancellationToken)
            {
                var activity = activitiesFacade.GetById(query.Id);
                if (activity == null) return null;
                return activity;
            }
        }
    }
}
