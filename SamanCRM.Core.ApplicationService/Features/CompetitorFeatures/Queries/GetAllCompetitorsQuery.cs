using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompetitorFeatures.Queries
{
    public class GetAllCompetitorsQuery : IRequest<IEnumerable<CompetitorDTO>>
    {
        public class GetAllCompetitorsQueryHandler : IRequestHandler<GetAllCompetitorsQuery, IEnumerable<CompetitorDTO>>
        {
            private readonly ICompetitorFacade competitorFacade;

            public GetAllCompetitorsQueryHandler(ICompetitorFacade competitorFacade)
            {
                this.competitorFacade = competitorFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<CompetitorDTO>> Handle(GetAllCompetitorsQuery query, CancellationToken cancellationToken)
            {
                var CompetitorList = competitorFacade.GetAll().ToList();
                if (CompetitorList == null)
                {
                    return null;
                }
                return CompetitorList.AsReadOnly();
            }
        }
    }
}
