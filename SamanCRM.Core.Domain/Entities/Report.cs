using SamanCRM.Core.Domain.Entities.Common;
using System;

namespace SamanCRM.Core.Domain.Entities
{
    public class Report : BaseEntity<int>
    {
        public Report()
        {
            ReportGuid = Guid.NewGuid();
        }
        public int ReportID { get; set; }
        public Guid ReportGuid { get; set; }
        public string ReportName { get; set; }
        public string Display { get; set; }
        public string ReportModule { get; set; }
        public bool AuditTable { get; set; }
        public string User { get; set; }
        public string ReportRange { get; set; }
        public string ReportFormat { get; set; }
        public string InternalDesc { get; set; }
        public string PublicDesc { get; set; }
    }
}
