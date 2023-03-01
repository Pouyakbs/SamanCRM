using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class ApplicationSettings : BaseEntity<int>
    {
        public int SettingID { get; set; }
        public string VariableName { get; set; }
        public string Value { get; set; }
        public int PersonnelID { get; set; }
        public Personnel Personnel { get; set; }
    }
}
