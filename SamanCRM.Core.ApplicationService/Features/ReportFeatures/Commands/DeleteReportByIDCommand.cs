using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ReportFeatures.Commands
{
    public class DeleteReportByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteReportByIDCommandHandler : IRequestHandler<DeleteReportByIDCommand, int>
        {
            private readonly IReportFacade reportFacade;

            public DeleteReportByIDCommandHandler(IReportFacade reportFacade)
            {
                this.reportFacade = reportFacade;
            }
            public Task<int> Handle(DeleteReportByIDCommand command, CancellationToken cancellationToken)
            {
                var report = reportFacade.GetById(command.Id);
                reportFacade.Remove(report);
                return Task.FromResult(command.Id);
            }
        }
    }
}
