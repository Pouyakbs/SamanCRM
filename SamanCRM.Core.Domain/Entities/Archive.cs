using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Archive : BaseEntity<int>
    {
        public Archive()
        {
            ArchiveGuid = Guid.NewGuid();
        }
        public int ArchiveID { get; set; }
        public Guid ArchiveGuid { get; set; }
        public string EntityType { get; set; }
        public string FileName { get; set; }
        public string FileFormat { get; set; }
        public int RecordID { get; set; }
        public byte[] File { get; set; }
    }
}
