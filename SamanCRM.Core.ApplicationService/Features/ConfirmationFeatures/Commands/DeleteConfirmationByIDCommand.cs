using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConfirmationFeatures.Commands
{
    public class DeleteConfirmationByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteConfirmationByIDCommandHandler : IRequestHandler<DeleteConfirmationByIDCommand, int>
        {
            private readonly IConfirmationFacade confirmationFacade;

            public DeleteConfirmationByIDCommandHandler(IConfirmationFacade confirmationFacade)
            {
                this.confirmationFacade = confirmationFacade;
            }
            public Task<int> Handle(DeleteConfirmationByIDCommand command, CancellationToken cancellationToken)
            {
                var confirmation = confirmationFacade.GetById(command.Id);
                confirmationFacade.Remove(confirmation);
                return Task.FromResult(command.Id);
            }
        }
    }
}
