using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.InvoiceFeatures.Queries
{
    public class GetAllInvoicesQuery : IRequest<IEnumerable<InvoiceDTO>>
    {
        public class GetAllInvoicesQueryHandler : IRequestHandler<GetAllInvoicesQuery, IEnumerable<InvoiceDTO>>
        {
            private readonly IInvoiceFacade invoiceFacade;

            public GetAllInvoicesQueryHandler(IInvoiceFacade invoiceFacade)
            {
                this.invoiceFacade = invoiceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<InvoiceDTO>> Handle(GetAllInvoicesQuery query, CancellationToken cancellationToken)
            {
                var InvoicesList = invoiceFacade.GetAll().ToList();
                if (InvoicesList == null)
                {
                    return null;
                }
                return InvoicesList.AsReadOnly();
            }
        }
    }
}
