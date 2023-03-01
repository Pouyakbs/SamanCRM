using SamanCRM.Core.Domain.Entities.Common;
using System;

namespace SamanCRM.Core.Domain.Entities
{
    public class Analysis : BaseEntity<int>
    {
        public Analysis()
        {
            AnalysisGuid = Guid.NewGuid();
        }
        public int AnalysisID { get; set; }
        public Guid AnalysisGuid { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public string AnalysisArea { get; set; }
    }
}
