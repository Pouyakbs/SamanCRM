using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompetitorFeatures.Commands
{
    public class DeleteCompetitorByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteCompetitorByIDCommandHandler : IRequestHandler<DeleteCompetitorByIDCommand, int>
        {
            private readonly ICompetitorFacade competitorFacade;

            public DeleteCompetitorByIDCommandHandler(ICompetitorFacade competitorFacade)
            {
                this.competitorFacade = competitorFacade;
            }
            public Task<int> Handle(DeleteCompetitorByIDCommand command, CancellationToken cancellationToken)
            {
                var Competitor = competitorFacade.GetById(command.Id);
                competitorFacade.Remove(Competitor);
                return Task.FromResult(command.Id);
            }
        }
    }
}
