using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServiceFeatures.Commands
{
    public class DeleteServiceByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteServiceByIDCommandHandler : IRequestHandler<DeleteServiceByIDCommand, int>
        {
            private readonly IServiceFacade serviceFacade;

            public DeleteServiceByIDCommandHandler(IServiceFacade serviceFacade)
            {
                this.serviceFacade = serviceFacade;
            }
            public Task<int> Handle(DeleteServiceByIDCommand command, CancellationToken cancellationToken)
            {
                var service = serviceFacade.GetById(command.Id);
                serviceFacade.Remove(service);
                return Task.FromResult(command.Id);
            }
        }
    }
}
