using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class OpportunitiesProducts
    {
        public int OpportunitiesID { get; set; }
        public Opportunities Opportunities { get; set; }
        public int ProductsID { get; set; }
        public Products Products { get; set; }
    }
}
