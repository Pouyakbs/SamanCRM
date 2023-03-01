using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompetitorFeatures.Queries
{
    public class GetCompetitorByIdQuery : IRequest<CompetitorDTO>
    {
        public int Id { get; set; }
        public class GetCompetitorByIdQueryHandler : IRequestHandler<GetCompetitorByIdQuery, CompetitorDTO>
        {
            private readonly ICompetitorFacade competitorFacade;

            public GetCompetitorByIdQueryHandler(ICompetitorFacade competitorFacade)
            {
                this.competitorFacade = competitorFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<CompetitorDTO> Handle(GetCompetitorByIdQuery query, CancellationToken cancellationToken)
            {
                var competitor = competitorFacade.GetById(query.Id);
                if (competitor == null) return null;
                return competitor;
            }
        }
    }
}
