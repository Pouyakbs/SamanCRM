using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace SamanCRM.Core.Domain.Entities
{
    public class Competitor : BaseEntity<int>
    {
        public Competitor()
        {
            CompetitorGuid = Guid.NewGuid();
        }
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
    }
}
