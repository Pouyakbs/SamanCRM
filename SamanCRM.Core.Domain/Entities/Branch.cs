using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Branch : BaseEntity<int>
    {

        public Branch()
        {
            BranchGuid = Guid.NewGuid();
        }
        public Guid BranchGuid { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string BranchPhoneNum { get; set; }
        public List<BranchUser> BranchUsers { get; set; }
    }
}
