using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace SamanCRM.Core.Domain.Entities
{
    public class Products : BaseEntity<int>
    {
        public Products()
        {
            ProductGuid = Guid.NewGuid();
        }
        public int ProductID { get; set; }
        public Guid ProductGuid { get; set; }
        public string ProductName { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public string ProductCode { get; set; }
        public string MoneyUnit { get; set; }
        public double SalePrice { get; set; }
        public double PurchasePrice { get; set; }
        public string MainMeasurement { get; set; }
        public string SecondMeasurement { get; set; }
        public int HoursCount { get; set; }
        public string BatchNum { get; set; }
        public string SerialNum { get; set; }
        public string LatNum { get; set; }
        public DateTime ValidityDate { get; set; }
        public string ProductURL { get; set; }
        public string Barcode { get; set; }
        public string InvoiceType { get; set; }
        public bool Saleable { get; set; }
        public bool NeedProductReturn { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double NetWeight { get; set; }
        public double GrossWeight { get; set; }
        public int PocketNum { get; set; }
        public string Desc { get; set; }
        public string NumPerUnit { get; set; }
        public string StoreInventory { get; set; }
        public string OrderRate { get; set; }
        public string AvailableForSale { get; set; }
        public string SafetyStock { get; set; }
        public string Pursuer { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<SupplierProducts> SupplierProducts { get; set; }
        public List<PreInvoiceProducts> PreInvoiceProducts { get; set; }
        public List<Services> Services { get; set; }
        public List<InvoiceProducts> InvoiceProducts { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public List<OpportunitiesProducts> OpportunitiesProducts { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public int CategoryID { get; set; }
        public ProductCategory ProductCategory { get; set; }
    }
}
