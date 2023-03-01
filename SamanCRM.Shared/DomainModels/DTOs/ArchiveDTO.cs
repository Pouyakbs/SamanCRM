using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ArchiveDTO
    {
        public int ArchiveID { get; set; }
        public Guid ArchiveGuid { get; set; }
        public string EntityType { get; set; }
        public int RecordID { get; set; }
        public string FileFormat { get; set; }
        public string FileName { get; set; }
        public string File { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
