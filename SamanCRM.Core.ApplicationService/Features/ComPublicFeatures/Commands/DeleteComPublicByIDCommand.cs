using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Commands
{

    public class DeleteComPublicByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteComPublicByIDCommandHandler : IRequestHandler<DeleteComPublicByIDCommand, int>
        {
            private readonly IComPublicFacade comPublicFacade;

            public DeleteComPublicByIDCommandHandler(IComPublicFacade comPublicFacade)
            {
                this.comPublicFacade = comPublicFacade;
            }
            public Task<int> Handle(DeleteComPublicByIDCommand command, CancellationToken cancellationToken)
            {
                var comPublic = comPublicFacade.GetById(command.Id);
                comPublicFacade.Remove(comPublic);
                return Task.FromResult(command.Id);
            }
        }
    }
}
