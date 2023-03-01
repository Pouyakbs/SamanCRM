using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BuyOrderFeatures.Queries
{
    public class GetAllBuyOrdersQuery : IRequest<IEnumerable<BuyOrderDTO>>
    {
        public class GetAllBuyOrdersQueryHandler : IRequestHandler<GetAllBuyOrdersQuery, IEnumerable<BuyOrderDTO>>
        {
            private readonly IBuyOrderFacade buyOrderFacade;

            public GetAllBuyOrdersQueryHandler(IBuyOrderFacade buyOrderFacade)
            {
                this.buyOrderFacade = buyOrderFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<BuyOrderDTO>> Handle(GetAllBuyOrdersQuery query, CancellationToken cancellationToken)
            {
                var buyOrdersList = buyOrderFacade.GetAll().ToList();
                if (buyOrdersList == null)
                {
                    return null;
                }
                return buyOrdersList.AsReadOnly();
            }
        }
    }
}
