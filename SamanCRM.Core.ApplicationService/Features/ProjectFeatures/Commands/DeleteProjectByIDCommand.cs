using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProjectFeatures.Commands
{
    public class DeleteProjectByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteProjectByIDCommandHandler : IRequestHandler<DeleteProjectByIDCommand, int>
        {
            private readonly IProjectFacade projectFacade;

            public DeleteProjectByIDCommandHandler(IProjectFacade projectFacade)
            {
                this.projectFacade = projectFacade;
            }
            public Task<int> Handle(DeleteProjectByIDCommand command, CancellationToken cancellationToken)
            {
                var project = projectFacade.GetById(command.Id);
                projectFacade.Remove(project);
                return Task.FromResult(command.Id);
            }
        }
    }
}
