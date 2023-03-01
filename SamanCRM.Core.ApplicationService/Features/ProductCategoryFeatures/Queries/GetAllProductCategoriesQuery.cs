using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductCategoryFeatures.Queries
{
    public class GetAllProductCategoriesQuery : IRequest<IEnumerable<ProductCategoryDTO>>
    {
        public class GetAllProductCategoriesQueryHandler : IRequestHandler<GetAllProductCategoriesQuery, IEnumerable<ProductCategoryDTO>>
        {
            private readonly IProductCategoryFacade productCategoryFacade;

            public GetAllProductCategoriesQueryHandler(IProductCategoryFacade productCategoryFacade)
            {
                this.productCategoryFacade = productCategoryFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ProductCategoryDTO>> Handle(GetAllProductCategoriesQuery query, CancellationToken cancellationToken)
            {
                var productCategoriesList = productCategoryFacade.GetAll().ToList();
                if (productCategoriesList == null)
                {
                    return null;
                }
                return productCategoriesList.AsReadOnly();
            }
        }
    }
}
