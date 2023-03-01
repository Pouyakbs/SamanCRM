using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PreInvoiceFeatures.Commands
{
    public class DeletePreInvoiceByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeletePreInvoiceByIDCommandHandler : IRequestHandler<DeletePreInvoiceByIDCommand, int>
        {
            private readonly IPreInvoiceFacade preInvoiceFacade;

            public DeletePreInvoiceByIDCommandHandler(IPreInvoiceFacade preInvoiceFacade)
            {
                this.preInvoiceFacade = preInvoiceFacade;
            }
            public Task<int> Handle(DeletePreInvoiceByIDCommand command, CancellationToken cancellationToken)
            {
                var preInvoice = preInvoiceFacade.GetById(command.Id);
                preInvoiceFacade.Remove(preInvoice);
                return Task.FromResult(command.Id);
            }
        }
    }
}
