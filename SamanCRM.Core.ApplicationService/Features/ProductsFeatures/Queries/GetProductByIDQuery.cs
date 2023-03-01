using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductsFeatures.Queries
{
    public class GetProductByIdQuery : IRequest<ProductsDTO>
    {
        public int Id { get; set; }
        public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductsDTO>
        {
            private readonly IProductsFacade productFacade;

            public GetProductByIdQueryHandler(IProductsFacade productFacade)
            {
                this.productFacade = productFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ProductsDTO> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
            {
                var product = productFacade.GetById(query.Id);
                if (product == null) return null;
                return product;
            }
        }
    }
}
