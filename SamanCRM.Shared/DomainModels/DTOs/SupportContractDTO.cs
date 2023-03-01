using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class SupportContractDTO
    {
        public int ContractID { get; set; }
        public Guid ContractGuid { get; set; }
        public string Name { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractEndDate { get; set; }
        public string ContractReminder { get; set; }
        public string ContractType { get; set; }
        public int PriceAdjustment { get; set; }
        public int Discount { get; set; }
        public double FinalPrice { get; set; }
        public int User { get; set; }
        public string MoneyUnit { get; set; }
        public string ServiceUnit { get; set; }
        public string Limitation { get; set; }
        public int RecievedService { get; set; }
        public string ServiceRemaining { get; set; }
        public string Attractiveness { get; set; }
        public string SpecialTerms { get; set; }
        public string Desc { get; set; }
        public string SignOfCustomer { get; set; }
        public string InternalSign { get; set; }
        public string CustomerSignTitle { get; set; }
        public DateTime InternalSignDate { get; set; }
        public DateTime CustomerSignDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public int AccountID { get; set; }
        public int OpportunitiesID { get; set; }
    }
}
