using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class InvoiceProducts
    {
        public int InvoiceID { get; set; }
        public Invoice Invoice { get; set; }
        public int ProductID { get; set; }
        public Products Products { get; set; }
    }
}
