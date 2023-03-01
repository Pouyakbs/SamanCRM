using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ReportFeatures.Queries
{
    public class GetReportByIdQuery : IRequest<ReportDTO>
    {
        public int Id { get; set; }
        public class GetReportByIdQueryHandler : IRequestHandler<GetReportByIdQuery, ReportDTO>
        {
            private readonly IReportFacade reportFacade;

            public GetReportByIdQueryHandler(IReportFacade reportFacade)
            {
                this.reportFacade = reportFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ReportDTO> Handle(GetReportByIdQuery query, CancellationToken cancellationToken)
            {
                var report = reportFacade.GetById(query.Id);
                if (report == null) return null;
                return report;
            }
        }
    }
}
