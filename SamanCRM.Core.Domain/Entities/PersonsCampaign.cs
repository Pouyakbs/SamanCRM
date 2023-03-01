using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class PersonsCampaign
    {
        public int PersonID { get; set; }
        public Persons Persons { get; set; }
        public int CampaignID { get; set; }
        public Campaign Campaign { get; set; }
    }
}
