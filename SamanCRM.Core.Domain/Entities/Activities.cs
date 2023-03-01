using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace SamanCRM.Core.Domain.Entities
{
    public class Activities : BaseEntity<int>
    {
        public Activities()
        {
            ActivityGuid = Guid.NewGuid();
        }
        public int ActivityID { get; set; }
        public Guid ActivityGuid { get; set; }
        public string EntityType { get; set; }
        public string ActivityType { get; set; }
        public int PersonnelID { get; set; }
        public Personnel Personnel { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ActivitiesDetail ActivitiesDetail { get; set; }
    }
}
