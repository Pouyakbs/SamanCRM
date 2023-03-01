using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Campaign : BaseEntity<int>
    {
        public Campaign()
        {
            CampaignGuid = Guid.NewGuid();
        }
        public int CampaignID { get; set; }
        public Guid CampaignGuid { get; set; }
        public string CampaignName { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Type { get; set; }
        public string RepetitionRate { get; set; }
        public int ParentID { get; set; }
        public string MoneyUnit { get; set; }
        public string ReadEmails { get; set; }
        public double Budget { get; set; }
        public double RealCost { get; set; }
        public double ExpectedCost { get; set; }
        public double ExpectedIncome { get; set; }
        public string ExpectedAnswer { get; set; }
        public string Target { get; set; }
        public string Desc { get; set; }
        public List<AccountCampaign> AccountCampaigns { get; set; }
        public List<PersonsCampaign> PersonsCampaign { get; set; }
        public List<OpportunitiesCampaign> OpportunitiesCampaigns { get; set; }
    }
}
