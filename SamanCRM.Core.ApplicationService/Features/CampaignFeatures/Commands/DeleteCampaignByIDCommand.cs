using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CampaignFeatures.Commands
{
    public class DeleteCampaignByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteCampaignByIDCommandHandler : IRequestHandler<DeleteCampaignByIDCommand, int>
        {
            private readonly ICampaignFacade campaignFacade;

            public DeleteCampaignByIDCommandHandler(ICampaignFacade campaignFacade)
            {
                this.campaignFacade = campaignFacade;
            }
            public Task<int> Handle(DeleteCampaignByIDCommand command, CancellationToken cancellationToken)
            {
                var campaign = campaignFacade.GetById(command.Id);
                campaignFacade.Remove(campaign);
                return Task.FromResult(command.Id);
            }
        }
    }
}
