using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CampaignFeatures.Queries
{
    public class GetCampaignByIdQuery : IRequest<CampaignDTO>
    {
        public int Id { get; set; }
        public class GetCampaignByIdQueryHandler : IRequestHandler<GetCampaignByIdQuery, CampaignDTO>
        {
            private readonly ICampaignFacade campaignFacade;

            public GetCampaignByIdQueryHandler(ICampaignFacade campaignFacade)
            {
                this.campaignFacade = campaignFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<CampaignDTO> Handle(GetCampaignByIdQuery query, CancellationToken cancellationToken)
            {
                var campaign = campaignFacade.GetById(query.Id);
                if (campaign == null) return null;
                return campaign;
            }
        }
    }
}
