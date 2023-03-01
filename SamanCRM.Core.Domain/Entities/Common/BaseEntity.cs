using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities.Common
{
    public abstract class BaseEntity<T>
    {
        public BaseEntity()
        {
            ModifiedDate = DateTime.Now;
        }
        public int BranchID { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string CreatedByUser { get; set; }
        public string ModifiedByUser { get; set; }
    }
}
