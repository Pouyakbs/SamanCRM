using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Domain.Entities
{
    public class Persons : BaseEntity<int>
    {
        public Persons()
        {
            PersonGuid = Guid.NewGuid();
        }
        public int PersonID { get; set; }
        public Guid PersonGuid { get; set; }
        public string NickName { get; set; }
        public string PersonName { get; set; }
        public string Surname { get; set; }
        public string Segment { get; set; }
        public string AccountName { get; set; }
        public string ClueSource { get; set; }
        public string ContactFields { get; set; }
        public string Email { get; set; }
        public string Section { get; set; }
        public string Username { get; set; }
        public string Desc { get; set; }
        public string ManagerName { get; set; }
        public string SecretaryName { get; set; }
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
        public string OtherGeographyLoc { get; set; }
        public string OtherCountry { get; set; }
        public string OtherCity { get; set; }
        public string OtherState { get; set; }
        public string OtherLatitude { get; set; }
        public string OtherLongitude { get; set; }
        public string OtherAddress { get; set; }
        public string OtherPostalCode { get; set; }
        public string Instagram { get; set; }
        public string LinkedIn { get; set; }
        public string Twitter { get; set; }
        public string FaceBook { get; set; }
        public string Blog { get; set; }
        public List<PersonsCampaign> PersonsCampaigns { get; set; }
        public int AccountID { get; set; }
        public Account Account { get; set; }
        public PreInvoice PreInvoice { get; set; }
        public Invoice Invoice { get; set; }
        public List<Services> Services { get; set; }
    }
}
