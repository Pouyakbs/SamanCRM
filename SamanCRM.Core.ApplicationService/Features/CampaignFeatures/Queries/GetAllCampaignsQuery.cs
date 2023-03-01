using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CampaignFeatures.Queries
{
    public class GetAllCampaignsQuery : IRequest<IEnumerable<CampaignDTO>>
    {
        public class GetAllCampaignsQueryHandler : IRequestHandler<GetAllCampaignsQuery, IEnumerable<CampaignDTO>>
        {
            private readonly ICampaignFacade campaignFacade;

            public GetAllCampaignsQueryHandler(ICampaignFacade campaignFacade)
            {
                this.campaignFacade = campaignFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<CampaignDTO>> Handle(GetAllCampaignsQuery query, CancellationToken cancellationToken)
            {
                var campaignsList = campaignFacade.GetAll().ToList();
                if (campaignsList == null)
                {
                    return null;
                }
                return campaignsList.AsReadOnly();
            }
        }
    }
}
