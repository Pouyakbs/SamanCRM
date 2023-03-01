using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicTitles.Commands
{

    public class DeleteComPublicTitlesByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteComPublicTitlesByIDCommandHandler : IRequestHandler<DeleteComPublicTitlesByIDCommand, int>
        {
            private readonly IComPublicTitlesFacade comPublicTitlesFacade;

            public DeleteComPublicTitlesByIDCommandHandler(IComPublicTitlesFacade comPublicTitlesFacade)
            {
                this.comPublicTitlesFacade = comPublicTitlesFacade;
            }
            public Task<int> Handle(DeleteComPublicTitlesByIDCommand command, CancellationToken cancellationToken)
            {
                var comPublic = comPublicTitlesFacade.GetById(command.Id);
                comPublicTitlesFacade.Remove(comPublic);
                return Task.FromResult(command.Id);
            }
        }
    }
}
