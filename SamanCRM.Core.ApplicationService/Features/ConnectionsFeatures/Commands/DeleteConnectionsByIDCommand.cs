using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConnectionsFeatures.Commands
{
    public class DeleteConnectionsByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteConnectionsByIDCommandHandler : IRequestHandler<DeleteConnectionsByIDCommand, int>
        {
            private readonly IConnectionsFacade connectionsFacade;

            public DeleteConnectionsByIDCommandHandler(IConnectionsFacade connectionsFacade)
            {
                this.connectionsFacade = connectionsFacade;
            }
            public Task<int> Handle(DeleteConnectionsByIDCommand command, CancellationToken cancellationToken)
            {
                var connections = connectionsFacade.GetById(command.Id);
                connectionsFacade.Remove(connections);
                return Task.FromResult(command.Id);
            }
        }
    }
}
