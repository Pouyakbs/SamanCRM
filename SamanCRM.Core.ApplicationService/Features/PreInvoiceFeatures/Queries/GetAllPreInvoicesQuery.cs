using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PreInvoiceFeatures.Queries
{
    public class GetAllPreInvoicesQuery : IRequest<IEnumerable<PreInvoiceDTO>>
    {
        public class GetAllPreInvoicesQueryHandler : IRequestHandler<GetAllPreInvoicesQuery, IEnumerable<PreInvoiceDTO>>
        {
            private readonly IPreInvoiceFacade preInvoiceFacade;

            public GetAllPreInvoicesQueryHandler(IPreInvoiceFacade preInvoiceFacade)
            {
                this.preInvoiceFacade = preInvoiceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<PreInvoiceDTO>> Handle(GetAllPreInvoicesQuery query, CancellationToken cancellationToken)
            {
                var preInvoiceList = preInvoiceFacade.GetAll().ToList();
                if (preInvoiceList == null)
                {
                    return null;
                }
                return preInvoiceList.AsReadOnly();
            }
        }
    }
}
