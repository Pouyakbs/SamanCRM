using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class PasswordComplexity : BaseEntity<int>
    {
        public int PasswordComplexityID { get; set; }
        public Guid PasswordComplexityGuid { get; set; }
        public int PassLeastChar { get; set; }
        public int PassMaxChar { get; set; }
        public bool UseChar { get; set; }
        public bool UseSpecialChar { get; set; }
        public bool UseDigit { get; set; }
        public string SpecialChar { get; set; }
    }
}
