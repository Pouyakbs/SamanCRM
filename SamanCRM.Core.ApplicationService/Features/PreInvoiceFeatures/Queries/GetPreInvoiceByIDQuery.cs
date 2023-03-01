using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PreInvoiceFeatures.Queries
{
    public class GetPreInvoiceByIdQuery : IRequest<PreInvoiceDTO>
    {
        public int Id { get; set; }
        public class GetPreInvoiceByIdQueryHandler : IRequestHandler<GetPreInvoiceByIdQuery, PreInvoiceDTO>
        {
            private readonly IPreInvoiceFacade preInvoiceFacade;

            public GetPreInvoiceByIdQueryHandler(IPreInvoiceFacade preInvoiceFacade)
            {
                this.preInvoiceFacade = preInvoiceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<PreInvoiceDTO> Handle(GetPreInvoiceByIdQuery query, CancellationToken cancellationToken)
            {
                var preInvoice = preInvoiceFacade.GetById(query.Id);
                if (preInvoice == null) return null;
                return preInvoice;
            }
        }
    }
}
