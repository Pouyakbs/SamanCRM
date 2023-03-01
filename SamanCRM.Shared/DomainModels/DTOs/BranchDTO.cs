using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class BranchDTO
    {
        public int BranchID { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string BranchPhoneNum { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
