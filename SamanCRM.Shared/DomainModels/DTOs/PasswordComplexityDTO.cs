using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class PasswordComplexityDTO
    {
        public int PasswordComplexityID { get; set; }
        public Guid PasswordComplexityGuid { get; set; }
        public int PassLeastChar { get; set; }
        public int PassMaxChar { get; set; }
        public bool UseChar { get; set; }
        public bool UseDigit { get; set; }
        public bool UseSpecialChar { get; set; }
        public string SpecialChar { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
