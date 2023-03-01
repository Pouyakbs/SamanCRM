using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class ComPublic : BaseEntity<int>
    {
        public int ComPublicID { get; set; }
        public string Title { get; set; }
        public int ParentID { get; set; }
        public int ProgramPartID { get; set; }
        public ProgramPart ProgramPart { get; set; }
        public int ComPublicTitleID { get; set; }
        public ComPublicTitles ComPublicTitles { get; set; }
    }
}
