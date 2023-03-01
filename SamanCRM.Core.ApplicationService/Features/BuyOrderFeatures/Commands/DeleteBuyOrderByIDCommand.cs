using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BuyOrderFeatures.Commands
{
    public class DeleteBuyOrderByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteBuyOrderByIDCommandHandler : IRequestHandler<DeleteBuyOrderByIDCommand, int>
        {
            private readonly IBuyOrderFacade buyOrderFacade;

            public DeleteBuyOrderByIDCommandHandler(IBuyOrderFacade buyOrderFacade)
            {
                this.buyOrderFacade = buyOrderFacade;
            }
            public Task<int> Handle(DeleteBuyOrderByIDCommand command, CancellationToken cancellationToken)
            {
                var buyOrder = buyOrderFacade.GetById(command.Id);
                buyOrderFacade.Remove(buyOrder);
                return Task.FromResult(command.Id);
            }
        }
    }
}
