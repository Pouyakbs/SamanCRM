using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.OpportunitiesFeatures.Commands
{
    public class DeleteOpportunitiesByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteOpportunitiesByIDCommandHandler : IRequestHandler<DeleteOpportunitiesByIDCommand, int>
        {
            private readonly IOpportunitiesFacade opportunitiesFacade;

            public DeleteOpportunitiesByIDCommandHandler(IOpportunitiesFacade opportunitiesFacade)
            {
                this.opportunitiesFacade = opportunitiesFacade;
            }
            public Task<int> Handle(DeleteOpportunitiesByIDCommand command, CancellationToken cancellationToken)
            {
                var opportunity = opportunitiesFacade.GetById(command.Id);
                opportunitiesFacade.Remove(opportunity);
                return Task.FromResult(command.Id);
            }
        }
    }
}
