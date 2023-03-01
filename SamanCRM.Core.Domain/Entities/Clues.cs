using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Clues : BaseEntity<int>
    {
        public Clues()
        {
            ClueGuid = Guid.NewGuid();
        }
        public int ClueID { get; set; }
        public Guid ClueGuid { get; set; }
        public string Type { get; set; }
        public string NickName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AccountName { get; set; }
        public string ClueSource { get; set; }
        public string ContactFields { get; set; }
        public string Emails { get; set; }
        public string Website { get; set; }
        public string Segment { get; set; }
        public string Status { get; set; }
        public string Desc { get; set; }
        public string Attractiveness { get; set; }
        public string ClueCampaign { get; set; }
        public string Industry { get; set; }
        public string SubIndustry { get; set; }
        public string RefferedBy { get; set; }
        public DateTime BirthDate { get; set; }
        public string NationalCode { get; set; }
        public string EcoCode { get; set; }
        public string SubNumber { get; set; }
        public string GeographyCode { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string OtherGeographyCode { get; set; }
        public string OtherCountry { get; set; }
        public string OtherState { get; set; }
        public string OtherCity { get; set; }
        public string OtherPostalCode { get; set; }
        public string OtherAddress { get; set; }
        public string OtherLat { get; set; }
        public string OtherLong { get; set; }
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Blog { get; set; }
        public Opportunities Opportunities { get; set; }
        public List<Campaign> Campaign { get; set; }
        public List<Project> Projects { get; set; }

    }
}
