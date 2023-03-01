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
    public class UpdateProductCategoryCommand : IRequest<int>
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int ParentID { get; set; }
        public string ParentCategory { get; set; }
        public string User { get; set; }
        public string Desc { get; set; }
        public class UpdateProductCategoryCommandHandler : IRequestHandler<UpdateProductCategoryCommand, int>
        {
            private readonly IProductCategoryFacade productCategoryFacade;

            public UpdateProductCategoryCommandHandler(IProductCategoryFacade productCategoryFacade)
            {
                this.productCategoryFacade = productCategoryFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateProductCategoryCommand command, CancellationToken cancellationToken)
            {
                var productCategoryDTO = new ProductCategoryDTO();
                productCategoryDTO.CategoryID = command.CategoryID;
                productCategoryDTO.CategoryName = command.CategoryName;
                productCategoryDTO.Desc = command.Desc;
                productCategoryDTO.ParentID = command.ParentID;
                productCategoryDTO.ParentCategory = command.ParentCategory;
                productCategoryFacade.Update(productCategoryDTO);
                return productCategoryDTO.CategoryID;
            }
        }
    }
}
