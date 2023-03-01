using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.OpportunitiesFeatures.Queries
{
    public class GetAllOpportunitiesQuery : IRequest<IEnumerable<OpportunitiesDTO>>
    {
        public class GetAllOpportunitiesQueryHandler : IRequestHandler<GetAllOpportunitiesQuery, IEnumerable<OpportunitiesDTO>>
        {
            private readonly IOpportunitiesFacade opportunitiesFacade;

            public GetAllOpportunitiesQueryHandler(IOpportunitiesFacade opportunitiesFacade)
            {
                this.opportunitiesFacade = opportunitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<OpportunitiesDTO>> Handle(GetAllOpportunitiesQuery query, CancellationToken cancellationToken)
            {
                var opportunitiesList = opportunitiesFacade.GetAll().ToList();
                if (opportunitiesList == null)
                {
                    return null;
                }
                return opportunitiesList.AsReadOnly();
            }
        }
    }
}
