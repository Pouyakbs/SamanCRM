using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ComPublicDTO
    {
        public int ComPublicID { get; set; }
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public int ComPublicTitleID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
