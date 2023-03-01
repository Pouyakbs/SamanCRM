using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ProductsDTO
    {
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
        public List<string> ProductImage { get; set; }
        public List<string> ProductImageFormat { get; set; }
        public List<string> ProductFiles { get; set; }
        public List<string> ProductFilesFormat { get; set; }
        public List<string> BarcodeImage { get; set; }
        public List<string> BarcodeImageFormat { get; set; }
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
        public int CategoryID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
