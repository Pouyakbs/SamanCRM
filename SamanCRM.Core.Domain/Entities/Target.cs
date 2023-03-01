using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Target : BaseEntity<int>
    {
        public Target()
        {
            TargetGuid = Guid.NewGuid();
        }
        public int TargetID { get; set; }
        public Guid TargetGuid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string OfficePhone { get; set; }
        public string PhoneNum { get; set; }
        public string HomeNum { get; set; }
        public string OtherPhoneNum { get; set; }
        public string Title { get; set; }
        public string Unit { get; set; }
        public DateTime BirthDate { get; set; }
        public string Fax { get; set; }
        public string AccountName { get; set; }
        public string SecretaryName { get; set; }
        public string User { get; set; }
        public bool CallMe { get; set; }
        public string Email { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string MainAddress { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string Desc { get; set; }
    }
}
