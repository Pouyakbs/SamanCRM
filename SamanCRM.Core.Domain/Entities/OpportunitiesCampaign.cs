using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class OpportunitiesCampaign
    {
        public int CampaignID { get; set; }
        public Campaign Campaign { get; set; }
        public int OpportunitiesID { get; set; }
        public Opportunities Opportunities { get; set; }
    }
}
