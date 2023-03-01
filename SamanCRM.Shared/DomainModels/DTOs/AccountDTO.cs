using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class AccountDTO
    {
        public int AccountID { get; set; }
        public Guid AccountGuid { get; set; }
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string User { get; set; }
        public string Fax { get; set; }
        public string ContactFields { get; set; }
        public string Emails { get; set; }
        public string Website { get; set; }
        public string Status { get; set; }
        public string Desc { get; set; }
        public string Attractiveness { get; set; }
        public string AnotherName { get; set; }
        public string Campaign { get; set; }
        public string Ownership { get; set; }
        public string Industry { get; set; }
        public string SubIndustry { get; set; }
        public string RefferedBy { get; set; }
        public string Member { get; set; }
        public string NationalNum { get; set; }
        public string EcoCode { get; set; }
        public string SubNumber { get; set; }
        public string GeographyCode { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string OtherGeographicalArea { get; set; }
        public string OtherCountry { get; set; }
        public string Otherstate { get; set; }
        public string Othercity { get; set; }
        public string OtherPostalCode { get; set; }
        public string Otheraddress { get; set; }
        public string Otherlatitude { get; set; }
        public string Otherlongitude { get; set; }
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Blog { get; set; }
        public string ValidityStatus { get; set; }
        public string ValidityType { get; set; }
        public DateTime ExpireTime { get; set; }
        public string ValiditySource { get; set; }
        public string ValidityLimit { get; set; }
        public string ValiditySourceDesc { get; set; }
        public double SaleDiscount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
