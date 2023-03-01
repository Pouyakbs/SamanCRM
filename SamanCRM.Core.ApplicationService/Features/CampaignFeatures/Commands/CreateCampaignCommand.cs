using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CampaignFeatures.Commands
{
    public class CreateCampaignCommand : IRequest<int>
    {
        public string CampaignName { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Type { get; set; }
        public string RepetitionRate { get; set; }
        public string OriginalCampaign { get; set; }
        public string MoneyUnit { get; set; }
        public string ReadEmails { get; set; }
        public double Budget { get; set; }
        public double RealCost { get; set; }
        public double ExpectedCost { get; set; }
        public double ExpectedIncome { get; set; }
        public string ExpectedAnswer { get; set; }
        public string Target { get; set; }
        public string Desc { get; set; }
        public class CreateCampaignCommandHandler : IRequestHandler<CreateCampaignCommand, int>
        {
            private readonly ICampaignFacade campaignFacade;

            public CreateCampaignCommandHandler(ICampaignFacade campaignFacade)
            {
                this.campaignFacade = campaignFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateCampaignCommand command, CancellationToken cancellationToken)
            {
                var campaignDTO = new CampaignDTO();
                campaignDTO.Budget = command.Budget;
                campaignDTO.CampaignName = command.CampaignName;
                campaignDTO.Desc = command.Desc;
                campaignDTO.EndDate = command.EndDate;
                campaignDTO.ExpectedAnswer = command.ExpectedAnswer;
                campaignDTO.ExpectedCost = command.ExpectedCost;
                campaignDTO.ExpectedIncome = command.ExpectedIncome;
                campaignDTO.MoneyUnit = command.MoneyUnit;
                campaignDTO.OriginalCampaign = command.OriginalCampaign;
                campaignDTO.ReadEmails = command.ReadEmails;
                campaignDTO.RealCost = command.RealCost;
                campaignDTO.RepetitionRate = command.RepetitionRate;
                campaignDTO.StartDate = command.StartDate;
                campaignDTO.Status = command.Status;
                campaignDTO.Target = command.Target;
                campaignDTO.Type = command.Type;
                campaignDTO.CreatedDate = DateTime.Now;
                campaignDTO.CampaignGuid = Guid.NewGuid();
                campaignFacade.Add(campaignDTO);
                return campaignDTO.CampaignID;
            }
        }
    }
}
