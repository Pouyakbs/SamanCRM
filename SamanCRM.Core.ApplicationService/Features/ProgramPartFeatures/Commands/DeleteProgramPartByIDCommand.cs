using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Commands
{
    public class DeleteProgramPartByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteProgramPartByIDCommandHandler : IRequestHandler<DeleteProgramPartByIDCommand, int>
        {
            private readonly IProgramPartFacade programPartFacade;

            public DeleteProgramPartByIDCommandHandler(IProgramPartFacade programPartFacade)
            {
                this.programPartFacade = programPartFacade;
            }
            public Task<int> Handle(DeleteProgramPartByIDCommand command, CancellationToken cancellationToken)
            {
                var programPart = programPartFacade.GetById(command.Id);
                programPartFacade.Remove(programPart);
                return Task.FromResult(command.Id);
            }
        }
    }
}
