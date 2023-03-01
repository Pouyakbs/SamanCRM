using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class AnalysisDTO
    {
        public int AnalysisID { get; set; }
        public Guid AnalysisGuid { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public string AnalysisArea { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
