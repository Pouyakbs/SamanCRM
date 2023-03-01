using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ProductCategoryDTO
    {
        public int CategoryID { get; set; }
        public Guid CategoryGuid { get; set; }
        public string CategoryName { get; set; }
        public int ParentID { get; set; }
        public string ParentCategory { get; set; }
        public string Desc { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
