using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class ProductCategory : BaseEntity<int>
    {
        public ProductCategory()
        {
            CategoryGuid = Guid.NewGuid();
        }
        public int CategoryID { get; set; }
        public Guid CategoryGuid { get; set; }
        public string CategoryName { get; set; }
        public int ParentID { get; set; }
        public string ParentCategory { get; set; }
        public string User { get; set; }
        public string Desc { get; set; }
        public List<Products> Products { get; set; }
    }
}
