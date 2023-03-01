using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SupplierFeatures.Commands
{
    public class DeleteSupplierByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteSupplierByIDCommandHandler : IRequestHandler<DeleteSupplierByIDCommand, int>
        {
            private readonly ISupplierFacade supplierFacade;

            public DeleteSupplierByIDCommandHandler(ISupplierFacade supplierFacade)
            {
                this.supplierFacade = supplierFacade;
            }
            public Task<int> Handle(DeleteSupplierByIDCommand command, CancellationToken cancellationToken)
            {
                var supplier = supplierFacade.GetById(command.Id);
                supplierFacade.Remove(supplier);
                return Task.FromResult(command.Id);
            }
        }
    }
}
