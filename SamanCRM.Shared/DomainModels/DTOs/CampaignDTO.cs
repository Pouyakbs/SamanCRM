using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class CampaignDTO
    {
        public int CampaignID { get; set; }
        public Guid CampaignGuid { get; set; }
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
        public DateTime CreatedDate { get; set; }
    }
}
