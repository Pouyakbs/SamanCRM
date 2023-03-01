using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AnalysisFeatures.Queries
{
    public class GetAnalysisByIdQuery : IRequest<AnalysisDTO>
    {
        public int Id { get; set; }
        public class GetAnalysisByIdQueryHandler : IRequestHandler<GetAnalysisByIdQuery, AnalysisDTO>
        {
            private readonly IAnalysisFacade analysisFacade;

            public GetAnalysisByIdQueryHandler(IAnalysisFacade analysisFacade)
            {
                this.analysisFacade = analysisFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<AnalysisDTO> Handle(GetAnalysisByIdQuery query, CancellationToken cancellationToken)
            {
                var analysis = analysisFacade.GetById(query.Id);
                if (analysis == null) return null;
                return analysis;
            }
        }
    }
}
