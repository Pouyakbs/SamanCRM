namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class PersonnelsWithRolesDTO
    {
        public int RoleID { get; set; }
        public int PersonnelID { get; set; }
        public string RoleName { get; set; }
        public int ParentID { get; set; }
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string WorkingUnit { get; set; }
    }

}
