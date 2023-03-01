using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Commands
{
    public class DeletePersonnelByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeletePersonnelByIDCommandHandler : IRequestHandler<DeletePersonnelByIDCommand, int>
        {
            private readonly IPersonnelFacade personnelFacade;

            public DeletePersonnelByIDCommandHandler(IPersonnelFacade personnelFacade)
            {
                this.personnelFacade = personnelFacade;
            }
            public Task<int> Handle(DeletePersonnelByIDCommand command, CancellationToken cancellationToken)
            {
                var personnel = personnelFacade.GetById(command.Id);
                personnelFacade.Remove(personnel);
                return Task.FromResult(command.Id);
            }
        }
    }
}
