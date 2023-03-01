using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class OpportunitiesDTO
    {
        public int OpportunityID { get; set; }
        public Guid OpportunityGuid { get; set; }
        public string OpportunityName { get; set; }
        public string MoneyUnit { get; set; }
        public string AccountName { get; set; }
        public string PriceBased { get; set; }
        public string SaleProcess { get; set; }
        public int AccountID { get; set; }
        public double Price { get; set; }
        public string SuccessProssibility { get; set; }
        public double ExpectedPrice { get; set; }
        public DateTime SaleDate { get; set; }
        public string ClueSource { get; set; }
        public int ClueID { get; set; }
        public List<string> CampaignsID { get; set; }
        public List<string> ProductsID { get; set; }
        public string Priority { get; set; }
        public string Project { get; set; }
        public string NextStep { get; set; }
        public string Type { get; set; }
        public string ReasonofLoss { get; set; }
        public string SaleForecast { get; set; }
        public string SendingInvoiceTerms { get; set; }
        public DateTime PayTermEndDate { get; set; }
        public string Desc { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
