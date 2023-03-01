using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AnalysisFeatures.Commands
{
    public class DeleteAnalysisByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteAnalysisByIDCommandHandler : IRequestHandler<DeleteAnalysisByIDCommand, int>
        {
            private readonly IAnalysisFacade analysisFacade;

            public DeleteAnalysisByIDCommandHandler(IAnalysisFacade analysisFacade)
            {
                this.analysisFacade = analysisFacade;
            }
            public Task<int> Handle(DeleteAnalysisByIDCommand command, CancellationToken cancellationToken)
            {
                var analysis = analysisFacade.GetById(command.Id);
                analysisFacade.Remove(analysis);
                return Task.FromResult(command.Id);
            }
        }
    }
}
