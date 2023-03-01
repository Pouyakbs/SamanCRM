using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SaleContractFeatures.Commands
{
    public class DeleteSaleContractByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteSaleContractByIDCommandHandler : IRequestHandler<DeleteSaleContractByIDCommand, int>
        {
            private readonly ISaleContractFacade saleContractFacade;

            public DeleteSaleContractByIDCommandHandler(ISaleContractFacade saleContractFacade)
            {
                this.saleContractFacade = saleContractFacade;
            }
            public Task<int> Handle(DeleteSaleContractByIDCommand command, CancellationToken cancellationToken)
            {
                var saleContract = saleContractFacade.GetById(command.Id);
                saleContractFacade.Remove(saleContract);
                return Task.FromResult(command.Id);
            }
        }
    }
}
