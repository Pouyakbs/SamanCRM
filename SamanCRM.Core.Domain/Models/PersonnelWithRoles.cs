using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace SamanCRM.Core.Domain.Models
{
    public partial class PersonnelWithRoles
    {
        public int RoleId { get; set; }
        public int PersonnelId { get; set; }
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string RoleName { get; set; }
        public int ParentId { get; set; }
        public string WorkingUnit { get; set; }
    }
}
