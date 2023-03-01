using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ReportFeatures.Commands
{
    public class UpdateReportCommand : IRequest<int>
    {
        public int ReportID { get; set; }
        public string ReportName { get; set; }
        public string Display { get; set; }
        public string ReportModule { get; set; }
        public bool AuditTable { get; set; }
        public string User { get; set; }
        public string ReportRange { get; set; }
        public string ReportFormat { get; set; }
        public string InternalDesc { get; set; }
        public string PublicDesc { get; set; }
        public class UpdateReportCommandHandler : IRequestHandler<UpdateReportCommand, int>
        {
            private readonly IReportFacade reportFacade;

            public UpdateReportCommandHandler(IReportFacade reportFacade)
            {
                this.reportFacade = reportFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateReportCommand command, CancellationToken cancellationToken)
            {
                var reportDTO = new ReportDTO();
                reportDTO.ReportID = command.ReportID;
                reportDTO.AuditTable = command.AuditTable;
                reportDTO.Display = command.Display;
                reportDTO.InternalDesc = command.InternalDesc;
                reportDTO.PublicDesc = command.PublicDesc;
                reportDTO.ReportFormat = command.ReportFormat;
                reportDTO.ReportModule = command.ReportModule;
                reportDTO.ReportName = command.ReportName;
                reportDTO.ReportRange = command.ReportRange;
                reportDTO.User = command.User;
                reportFacade.Update(reportDTO);
                return reportDTO.ReportID;
            }
        }
    }
}
