using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Company : BaseEntity<int>
    {
        public Company()
        {
            CompanyGuid = Guid.NewGuid();
        }
        public int CompanyID { get; set; }
        public Guid CompanyGuid { get; set; }
        public string CompanyName { get; set; }
        public string CompanyTitle { get; set; }
        public string SubNumber { get; set; }
        public string EcoCode { get; set; }
        public string NationalNum { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string OfficePhone { get; set; }
        public string Fax { get; set; }
        public string BankAccNum { get; set; }
        public string BankCardNum { get; set; }
        public string ShebaNum { get; set; }
        public string BankName { get; set; }
        public string AccountOwner { get; set; }
    }
}
