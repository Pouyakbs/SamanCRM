using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ApplicationSettingsDTO
    {
        public int SettingID { get; set; }
        public string VariableName { get; set; }
        public string Value { get; set; }
        public int PersonnelID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
