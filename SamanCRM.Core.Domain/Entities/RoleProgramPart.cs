using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class RoleProgramPart
    {
        public int RoleID { get; set; }
        public ApplicationRole ApplicationRole { get; set; }
        public int ProgramPartID { get; set; }
        public ProgramPart ProgramPart { get; set; }
    }
}
