using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.OpportunitiesFeatures.Queries
{
    public class GetOpportunitiesByIdQuery : IRequest<OpportunitiesDTO>
    {
        public int Id { get; set; }
        public class GetOpportunitiesByIdQueryHandler : IRequestHandler<GetOpportunitiesByIdQuery, OpportunitiesDTO>
        {
            private readonly IOpportunitiesFacade opportunitiesFacade;

            public GetOpportunitiesByIdQueryHandler(IOpportunitiesFacade opportunitiesFacade)
            {
                this.opportunitiesFacade = opportunitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<OpportunitiesDTO> Handle(GetOpportunitiesByIdQuery query, CancellationToken cancellationToken)
            {
                var opportunity = opportunitiesFacade.GetById(query.Id);
                if (opportunity == null) return null;
                return opportunity;
            }
        }
    }
}
