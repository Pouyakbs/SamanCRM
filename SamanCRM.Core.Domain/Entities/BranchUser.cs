using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class BranchUser
    {
        public int BranchID { get; set; }
        public Branch Branch { get; set; }
        public int UserID { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
