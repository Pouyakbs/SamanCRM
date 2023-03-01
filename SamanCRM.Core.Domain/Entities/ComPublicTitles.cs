using SamanCRM.Core.Domain.Entities.Common;
using System.Collections.Generic;

namespace SamanCRM.Core.Domain.Entities
{
    public class ComPublicTitles : BaseEntity<int>
    {
        public int TitleID { get; set; }
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public ProgramPart ProgramPart { get; set; }
        public List<ComPublic> ComPublics { get; set; }
    }
}
