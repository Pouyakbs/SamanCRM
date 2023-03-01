using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class CompetitorDTO
    {
        public int CompetitorID { get; set; }
        public Guid CompetitorGuid { get; set; }
        public string Name { get; set; }
        public string CeoName { get; set; }
        public string ContactFields { get; set; }
        public string CompAddress { get; set; }
        public string CompLong { get; set; }
        public string CompLat { get; set; }
        public string Website { get; set; }
        public string ActivityField { get; set; }
        public string ActivityExp { get; set; }
        public string ProductFields { get; set; }
        public string Strengths { get; set; }
        public string WeakPoints { get; set; }
        public List<string> CompetitorFile { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
