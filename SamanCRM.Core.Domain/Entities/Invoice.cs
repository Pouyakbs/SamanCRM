using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace SamanCRM.Core.Domain.Entities
{
    public class Invoice : BaseEntity<int>
    {
        public Invoice()
        {
            InvoiceGuid = Guid.NewGuid();
        }
        public int InvoiceID { get; set; }
        public Guid InvoiceGuid { get; set; }
        public string Title { get; set; } 
        public string InvoiceNum { get; set; }
        public string Status { get; set; }
        public DateTime InvoiceDate { get; set; }
        public int RelatedTo { get; set; }
        public int RelatedToInput { get; set; }
        public string PreInvoiceNum { get; set; }
        public string ReferenceCode { get; set; }
        public string User { get; set; }
        public string Project { get; set; }
        public string MoneyUnit { get; set; }
        public double Total { get; set; }
        public double Discount { get; set; }
        public double SubTotal { get; set; }
        public string OtherAdditions { get; set; }
        public double Shipment { get; set; }
        public double ShipmentTax { get; set; }
        public string ShipmentTaxPercentage { get; set; }
        public double Tax { get; set; }
        public double InsuranceAmount { get; set; }
        public string InsuranceAmountPercentage { get; set; }
        public double GoodJobDeposit { get; set; }
        public string GoodJobDepositPercentage { get; set; }
        public double TotalCount { get; set; }
        public string Desc { get; set; }
        public string Note { get; set; }
        public string CustomerSMS { get; set; }
        public string ProductSendMethod { get; set; }
        public string PaymentConditions { get; set; }
        public string ProductSendType { get; set; }
        public string InternalVerify { get; set; }
        public string InternalVerifyProblems { get; set; }
        public string PreInvoiceSenderCompany { get; set; }
        public string PreInvoicePrintFrame { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string OtherGeographyLoc { get; set; }
        public string OtherCountry { get; set; }
        public string OtherState { get; set; }
        public string OtherCity { get; set; } 
        public string OtherPostalCode { get; set; }
        public string OtherAddress { get; set; }
        public string OtherLat { get; set; }
        public string OtherLong { get; set; }
        public string ValidityLimit { get; set; }
        public double TotalReceivable { get; set; }
        public int AccountID { get; set; }
        public Account Account { get; set; }
        public int PersonsID { get; set; }
        public Persons Persons { get; set; }
        public int PreInvoiceID { get; set; }
        public PreInvoice PreInvoice { get; set; }
        [JsonIgnore]
        [IgnoreDataMember] 
        public List<InvoiceProducts> InvoiceProducts { get; set; }
    }
}
