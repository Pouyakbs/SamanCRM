using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductCategoryFeatures.Commands
{
    public class DeleteProductCategoryByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteProductCategoryByIDCommandHandler : IRequestHandler<DeleteProductCategoryByIDCommand, int>
        {
            private readonly IProductCategoryFacade productCategoryFacade;

            public DeleteProductCategoryByIDCommandHandler(IProductCategoryFacade productCategoryFacade)
            {
                this.productCategoryFacade = productCategoryFacade;
            }
            public Task<int> Handle(DeleteProductCategoryByIDCommand command, CancellationToken cancellationToken)
            {
                var productCategory = productCategoryFacade.GetById(command.Id);
                productCategoryFacade.Remove(productCategory);
                return Task.FromResult(command.Id);
            }
        }
    }
}
