using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductCategoryFeatures.Commands
{
    public class CreateProductCategoryCommand : IRequest<int>
    {
        public string CategoryName { get; set; }
        public int ParentID { get; set; }
        public string ParentCategory { get; set; }
        public string Desc { get; set; }
        public class CreateProductCategoryCommandHandler : IRequestHandler<CreateProductCategoryCommand, int>
        {
            private readonly IProductCategoryFacade productCategoryFacade;

            public CreateProductCategoryCommandHandler(IProductCategoryFacade productCategoryFacade)
            {
                this.productCategoryFacade = productCategoryFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateProductCategoryCommand command, CancellationToken cancellationToken)
            {
                var productCategoryDTO = new ProductCategoryDTO();
                productCategoryDTO.CategoryName = command.CategoryName;
                productCategoryDTO.Desc = command.Desc;
                productCategoryDTO.ParentID = command.ParentID;
                productCategoryDTO.ParentCategory = command.ParentCategory;
                productCategoryDTO.CreatedDate = DateTime.Now;
                productCategoryDTO.CategoryGuid = Guid.NewGuid();
                productCategoryFacade.Add(productCategoryDTO);
                return productCategoryDTO.CategoryID;
            }
        }
    }
}
