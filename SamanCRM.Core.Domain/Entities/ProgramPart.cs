using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace SamanCRM.Core.Domain.Entities
{
    public class ProgramPart
    {
        public int ID { get; set; }
        public int ParentID { get; set; }
        public string SystemName { get; set; }
        public string DisplayName { get; set; }
        public string Icon { get; set; }
        public int Priority { get; set; }
        public bool Active { get; set; }
        public string Type { get; set; }
        public string RouteName { get; set; }
        public string BreadCrumbs { get; set; }
        public int RoleID { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<ComPublic> ComPublics { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<ComPublicTitles> ComPublicTitles { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<RoleProgramPart> RoleProgramParts { get; set; }
    }
}
