using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class SupplierProducts
    {
        public int ProductID { get; set; }
        public Products Products { get; set; }
        public int SupplierID { get; set; }
        public Supplier Supplier { get; set; }
    }
}
