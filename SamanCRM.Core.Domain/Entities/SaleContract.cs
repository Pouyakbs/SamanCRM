using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class SaleContract : BaseEntity<int>
    {
        public SaleContract()
        {
            ContractGuid = Guid.NewGuid();
        }
        public int ContractID { get; set; }
        public Guid ContractGuid { get; set; }
        public string ContractTitle { get; set; }
        public string Status { get; set; }
        public int RelatedTo { get; set; }
        public int RelatedToInput { get; set; }
        public DateTime StartDate { get; set; }
        public string Customer { get; set; }
        public string SuccessRate { get; set; }
        public DateTime EndDate { get; set; }
        public string SaleOpportunity { get; set; }
        public string ReferenceCode { get; set; }
        public string ContractType { get; set; }
        public string ContractManager { get; set; }
        public string MoneyUnit { get; set; }
        public double Total { get; set; }
        public double Discount { get; set; }
        public double SubTotal { get; set; }
        public string OtherAdditions { get; set; }
        public string Shipment { get; set; }
        public double ShipmentTax { get; set; }
        public double Tax { get; set; }
        public double InsuranceDepositAmount { get; set; }
        public double GoodJobDeposit { get; set; }
        public double TotalCount { get; set; }
        public double GuaranteeObligations { get; set; }
        public string Desc { get; set; }
        public DateTime CustomerSignDate { get; set; }
        public DateTime CompanySignDate { get; set; }
        public string InvoiceSenderCompany { get; set; }
        public string InvoicedTill { get; set; }
        public string InvoiceSendPeriod { get; set; }
        public string InvoiceSendType { get; set; }
        public DateTime RememberExtentionDate { get; set; }
        public double ForecastSale { get; set; }
    }
}
