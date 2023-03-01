using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class PersonnelDTO
    {
        public int PersonnelID { get; set; }
        public Guid PersonnelGuid { get; set; }
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int orgPost { get; set; }
        public string contactFields { get; set; }
        public string InternalNum { get; set; }
        public string Email { get; set; }
        public string workingSection { get; set; }
        public string Username { get; set; }
        public string ManagerName { get; set; }
        public string WorkingUnit { get; set; }
        public DateTime BirthDate { get; set; }
        public string NationalCode { get; set; }
        public string Status { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
