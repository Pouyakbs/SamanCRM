using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class AccountCampaign
    {
        public int CampaignID { get; set; }
        public Campaign Campaign { get; set; }
        public int AccountID { get; set; }
        public Account Account { get; set; }
    }
}
