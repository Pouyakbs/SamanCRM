using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ReportFeatures.Queries
{
    public class GetAllReportsQuery : IRequest<IEnumerable<ReportDTO>>
    {
        public class GetAllReportsQueryHandler : IRequestHandler<GetAllReportsQuery, IEnumerable<ReportDTO>>
        {
            private readonly IReportFacade reportFacade;

            public GetAllReportsQueryHandler(IReportFacade reportFacade)
            {
                this.reportFacade = reportFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ReportDTO>> Handle(GetAllReportsQuery query, CancellationToken cancellationToken)
            {
                var reportList = reportFacade.GetAll().ToList();
                if (reportList == null)
                {
                    return null;
                }
                return reportList.AsReadOnly();
            }
        }
    }
}
