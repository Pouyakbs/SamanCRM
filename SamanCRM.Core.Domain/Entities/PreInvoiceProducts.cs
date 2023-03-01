using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class PreInvoiceProducts
    {
        public int PreInvoiceID { get; set; }
        public PreInvoice PreInvoice { get; set; }
        public int ProductsID { get; set; }
        public Products Products { get; set; }
    }
}
