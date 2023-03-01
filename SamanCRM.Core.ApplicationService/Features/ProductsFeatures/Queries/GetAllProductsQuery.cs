using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductsFeatures.Queries
{
    public class GetAllProductsQuery : IRequest<IEnumerable<ProductsDTO>>
    {
        public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<ProductsDTO>>
        {
            private readonly IProductsFacade productFacade;

            public GetAllProductsQueryHandler(IProductsFacade productFacade)
            {
                this.productFacade = productFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ProductsDTO>> Handle(GetAllProductsQuery query, CancellationToken cancellationToken)
            {
                var productList = productFacade.GetAll().ToList();
                if (productList == null)
                {
                    return null;
                }
                return productList.AsReadOnly();
            }
        }
    }
}
