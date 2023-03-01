using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Commands
{
    public class DeleteActivityByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteActivityByIDCommandHandler : IRequestHandler<DeleteActivityByIDCommand, int>
        {
            private readonly IActivitiesFacade activitiesFacade;

            public DeleteActivityByIDCommandHandler(IActivitiesFacade activitiesFacade)
            {
                this.activitiesFacade = activitiesFacade;
            }
            public Task<int> Handle(DeleteActivityByIDCommand command, CancellationToken cancellationToken)
            {
                var activity = activitiesFacade.GetById(command.Id);
                activitiesFacade.Remove(activity);
                return Task.FromResult(command.Id);
            }
        }
    }
}
