using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace SamanCRM.Core.Domain.Entities
{
    public class ApplicationRole : BaseEntity<int>
    {
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public int ParentID { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<PersonnelRole> PersonnelRole { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<RoleProgramPart> RoleProgramParts { get; set; }
    }
}
