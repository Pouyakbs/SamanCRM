using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.InvoiceFeatures.Commands
{
    public class DeleteInvoiceByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteInvoiceByIDCommandHandler : IRequestHandler<DeleteInvoiceByIDCommand, int>
        {
            private readonly IInvoiceFacade invoiceFacade;

            public DeleteInvoiceByIDCommandHandler(IInvoiceFacade invoiceFacade)
            {
                this.invoiceFacade = invoiceFacade;
            }
            public Task<int> Handle(DeleteInvoiceByIDCommand command, CancellationToken cancellationToken)
            {
                var invoice = invoiceFacade.GetById(command.Id);
                invoiceFacade.Remove(invoice);
                return Task.FromResult(command.Id);
            }
        }
    }
}
