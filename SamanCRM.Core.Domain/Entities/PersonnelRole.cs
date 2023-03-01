using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class PersonnelRole
    {
        public int RoleID { get; set; }
        public ApplicationRole ApplicationRole { get; set; }
        public int PersonnelID { get; set; }
        public Personnel Personnel { get; set; }
    }
}
