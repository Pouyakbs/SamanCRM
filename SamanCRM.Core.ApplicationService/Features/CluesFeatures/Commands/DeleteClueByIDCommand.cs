using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CluesFeatures.Commands
{
    public class DeleteClueByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteClueByIDCommandHandler : IRequestHandler<DeleteClueByIDCommand, int>
        {
            private readonly ICluesFacade clueFacade;

            public DeleteClueByIDCommandHandler(ICluesFacade clueFacade)
            {
                this.clueFacade = clueFacade;
            }
            public Task<int> Handle(DeleteClueByIDCommand command, CancellationToken cancellationToken)
            {
                var clue = clueFacade.GetById(command.Id);
                clueFacade.Remove(clue);
                return Task.FromResult(command.Id);
            }
        }
    }
}
