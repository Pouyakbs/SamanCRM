using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AnalysisFeatures.Commands
{
    public class CreateAnalysisCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string User { get; set; }
        public string AnalysisArea { get; set; }
        public class CreateAnalysisCommandHandler : IRequestHandler<CreateAnalysisCommand, int>
        {
            private readonly IAnalysisFacade analysisFacade;

            public CreateAnalysisCommandHandler(IAnalysisFacade analysisFacade)
            {
                this.analysisFacade = analysisFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateAnalysisCommand command, CancellationToken cancellationToken)
            {
                var analysisDTO = new AnalysisDTO();
                analysisDTO.AnalysisArea = command.AnalysisArea;
                analysisDTO.Name = command.Name;
                analysisDTO.User = command.User;
                analysisDTO.CreatedDate = DateTime.Now;
                analysisDTO.AnalysisGuid = Guid.NewGuid();
                analysisFacade.Add(analysisDTO);
                return analysisDTO.AnalysisID;
            }
        }
    }
}
