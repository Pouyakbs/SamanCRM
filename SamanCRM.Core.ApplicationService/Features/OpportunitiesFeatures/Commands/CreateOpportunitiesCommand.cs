using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.OpportunitiesFeatures.Commands
{
    public class CreateOpportunitiesCommand : IRequest<int>
    {
        public string OpportunityName { get; set; }
        public string MoneyUnit { get; set; }
        public string AccountName { get; set; }
        public string PriceBased { get; set; }
        public string SaleProcess { get; set; }
        public double Price { get; set; }
        public int AccountID { get; set; }
        public string SuccessProssibility { get; set; }
        public double ExpectedPrice { get; set; }
        public DateTime SaleDate { get; set; }
        public string ClueSource { get; set; }
        public int ClueID { get; set; }
        public List<string> ProductsID { get; set; }
        public List<string> CampaignsID { get; set; }
        public string Priority { get; set; }
        public string Project { get; set; }
        public string NextStep { get; set; }
        public string Type { get; set; }
        public string ReasonofLoss { get; set; }
        public string SaleForecast { get; set; }
        public string SendingInvoiceTerms { get; set; }
        public DateTime PayTermEndDate { get; set; }
        public string Desc { get; set; }
        public class CreateOpportunitiesCommandHandler : IRequestHandler<CreateOpportunitiesCommand, int>
        {
            private readonly IOpportunitiesFacade opportunitiesFacade;

            public CreateOpportunitiesCommandHandler(IOpportunitiesFacade opportunitiesFacade)
            {
                this.opportunitiesFacade = opportunitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateOpportunitiesCommand command, CancellationToken cancellationToken)
            {
                var opportunitiesDTO = new OpportunitiesDTO();
                opportunitiesDTO.AccountName = command.AccountName;
                opportunitiesDTO.ClueSource = command.ClueSource;
                opportunitiesDTO.ClueID = command.ClueID;
                opportunitiesDTO.Desc = command.Desc;
                opportunitiesDTO.AccountID = command.AccountID;
                opportunitiesDTO.ExpectedPrice = command.ExpectedPrice;
                opportunitiesDTO.MoneyUnit = command.MoneyUnit;
                opportunitiesDTO.NextStep = command.NextStep;
                opportunitiesDTO.OpportunityName = command.OpportunityName;
                opportunitiesDTO.PayTermEndDate = command.PayTermEndDate;
                opportunitiesDTO.Price = command.Price;
                opportunitiesDTO.PriceBased = command.PriceBased;
                opportunitiesDTO.Priority = command.Priority;
                opportunitiesDTO.Project = command.Project;
                opportunitiesDTO.ReasonofLoss = command.ReasonofLoss;
                opportunitiesDTO.SaleDate = command.SaleDate;
                opportunitiesDTO.ProductsID = command.ProductsID;
                opportunitiesDTO.CampaignsID = command.CampaignsID;
                opportunitiesDTO.SaleForecast = command.SaleForecast;
                opportunitiesDTO.SaleProcess = command.SaleProcess;
                opportunitiesDTO.SendingInvoiceTerms = command.SendingInvoiceTerms;
                opportunitiesDTO.SuccessProssibility = command.SuccessProssibility;
                opportunitiesDTO.Type = command.Type;
                opportunitiesDTO.CreatedDate = DateTime.Now;
                opportunitiesDTO.OpportunityGuid = Guid.NewGuid();
                opportunitiesFacade.Add(opportunitiesDTO);
                return opportunitiesDTO.OpportunityID;
            }
        }
    }
}
