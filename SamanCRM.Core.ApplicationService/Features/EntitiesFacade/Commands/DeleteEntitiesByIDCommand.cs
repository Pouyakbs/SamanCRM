using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Commands
{
    public class DeleteEntitiesByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteEntitiesByIDCommandHandler : IRequestHandler<DeleteEntitiesByIDCommand, int>
        {
            private readonly IEntitiesFacade entitiesFacade;

            public DeleteEntitiesByIDCommandHandler(IEntitiesFacade entitiesFacade)
            {
                this.entitiesFacade = entitiesFacade;
            }
            public Task<int> Handle(DeleteEntitiesByIDCommand command, CancellationToken cancellationToken)
            {
                var entities = entitiesFacade.GetById(command.Id);
                entitiesFacade.Remove(entities);
                return Task.FromResult(command.Id);
            }
        }
    }
}
