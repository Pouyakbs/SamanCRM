using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.InvoiceFeatures.Queries
{
    public class GetInvoiceByIdQuery : IRequest<InvoiceDTO>
    {
        public int Id { get; set; }
        public class GetInvoiceByIdQueryHandler : IRequestHandler<GetInvoiceByIdQuery, InvoiceDTO>
        {
            private readonly IInvoiceFacade invoiceFacade;

            public GetInvoiceByIdQueryHandler(IInvoiceFacade invoiceFacade)
            {
                this.invoiceFacade = invoiceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<InvoiceDTO> Handle(GetInvoiceByIdQuery query, CancellationToken cancellationToken)
            {
                var invoice = invoiceFacade.GetById(query.Id);
                if (invoice == null) return null;
                return invoice;
            }
        }
    }
}
