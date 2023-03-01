using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductsFeatures.Commands
{
    public class DeleteProductByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteProductByIDCommandHandler : IRequestHandler<DeleteProductByIDCommand, int>
        {
            private readonly IProductsFacade productFacade;

            public DeleteProductByIDCommandHandler(IProductsFacade productFacade)
            {
                this.productFacade = productFacade;
            }
            public Task<int> Handle(DeleteProductByIDCommand command, CancellationToken cancellationToken)
            {
                var product = productFacade.GetById(command.Id);
                productFacade.Remove(product);
                return Task.FromResult(command.Id);
            }
        }
    }
}
