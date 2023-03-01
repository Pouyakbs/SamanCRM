using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BuyOrderFeatures.Queries
{
    public class GetBuyOrderByIdQuery : IRequest<BuyOrderDTO>
    {
        public int Id { get; set; }
        public class GetBuyOrderByIdQueryHandler : IRequestHandler<GetBuyOrderByIdQuery, BuyOrderDTO>
        {
            private readonly IBuyOrderFacade buyOrderFacade;

            public GetBuyOrderByIdQueryHandler(IBuyOrderFacade buyOrderFacade)
            {
                this.buyOrderFacade = buyOrderFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<BuyOrderDTO> Handle(GetBuyOrderByIdQuery query, CancellationToken cancellationToken)
            {
                var buyOrder = buyOrderFacade.GetById(query.Id);
                if (buyOrder == null) return null;
                return buyOrder;
            }
        }
    }
}
