using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.TargetFeatures.Commands
{
    public class DeleteTargetByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteTargetByIDCommandHandler : IRequestHandler<DeleteTargetByIDCommand, int>
        {
            private readonly ITargetFacade targetFacade;

            public DeleteTargetByIDCommandHandler(ITargetFacade targetFacade)
            {
                this.targetFacade = targetFacade;
            }
            public Task<int> Handle(DeleteTargetByIDCommand command, CancellationToken cancellationToken)
            {
                var target = targetFacade.GetById(command.Id);
                targetFacade.Remove(target);
                return Task.FromResult(command.Id);
            }
        }
    }
}
