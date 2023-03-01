using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductCategoryFeatures.Queries
{
    public class GetProductCategoryByIdQuery : IRequest<ProductCategoryDTO>
    {
        public int Id { get; set; }
        public class GetProductCategoryByIdQueryHandler : IRequestHandler<GetProductCategoryByIdQuery, ProductCategoryDTO>
        {
            private readonly IProductCategoryFacade productCategoryFacade;

            public GetProductCategoryByIdQueryHandler(IProductCategoryFacade productCategoryFacade)
            {
                this.productCategoryFacade = productCategoryFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ProductCategoryDTO> Handle(GetProductCategoryByIdQuery query, CancellationToken cancellationToken)
            {
                var productCategory = productCategoryFacade.GetById(query.Id);
                if (productCategory == null) return null;
                return productCategory;
            }
        }
    }
}
