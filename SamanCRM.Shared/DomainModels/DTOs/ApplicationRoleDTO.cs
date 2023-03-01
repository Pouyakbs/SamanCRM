using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ApplicationRoleDTO
    {
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public int ParentID { get; set; }
        public int BranchID { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
