using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ComPublicTitlesDTO
    {
        public int TitleID { get; set; }
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
