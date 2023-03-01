using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AnalysisFeatures.Queries
{
    public class GetAllAnalysisQuery : IRequest<IEnumerable<AnalysisDTO>>
    {
        public class GetAllAnalysisQueryHandler : IRequestHandler<GetAllAnalysisQuery, IEnumerable<AnalysisDTO>>
        {
            private readonly IAnalysisFacade analysisFacade;

            public GetAllAnalysisQueryHandler(IAnalysisFacade analysisFacade)
            {
                this.analysisFacade = analysisFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<AnalysisDTO>> Handle(GetAllAnalysisQuery query, CancellationToken cancellationToken)
            {
                var analysisList = analysisFacade.GetAll().ToList();
                if (analysisList == null)
                {
                    return null;
                }
                return analysisList.AsReadOnly();
            }
        }
    }
}
