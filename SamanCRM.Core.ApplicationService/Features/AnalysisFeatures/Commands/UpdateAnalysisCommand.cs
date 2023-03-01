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
    public class UpdateAnalysisCommand : IRequest<int>
    {
        public int AnalysisID { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public string AnalysisArea { get; set; }
        public class UpdateAnalysisCommandHandler : IRequestHandler<UpdateAnalysisCommand, int>
        {
            private readonly IAnalysisFacade analysisFacade;

            public UpdateAnalysisCommandHandler(IAnalysisFacade analysisFacade)
            {
                this.analysisFacade = analysisFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public Task<int> Handle(UpdateAnalysisCommand command, CancellationToken cancellationToken)
            {
                var analysisDTO = new AnalysisDTO();
                analysisDTO.AnalysisID = command.AnalysisID;
                analysisDTO.AnalysisArea = command.AnalysisArea;
                analysisDTO.Name = command.Name;
                analysisDTO.User = command.User;
                analysisFacade.Update(analysisDTO);
                return Task.FromResult(command.AnalysisID);
            }
        }
    }
}
