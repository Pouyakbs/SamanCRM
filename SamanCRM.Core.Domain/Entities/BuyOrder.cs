using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class BuyOrder : BaseEntity<int>
    {
        public BuyOrder()
        {
            OrderGuid = Guid.NewGuid();
        }
        public int OrderID { get; set; }
        public Guid OrderGuid { get; set; }
        public int SupplierID { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Status { get; set; }
        public string Customer { get; set; }
        public DateTime OrderDate { get; set; }
        public string ForOpportunity { get; set; }
        public string MoneyUnit { get; set; }
        public double Totalprice { get; set; }
        public double Discount { get; set; }
        public double Subset { get; set; }
        public double Transport { get; set; }
        public double TransportTax { get; set; }
        public string TaxRate { get; set; }
        public double Tax { get; set; }
        public double TotalAmount { get; set; }
        public string ProductList { get; set; }
        public double OtherExpenses { get; set; }
        public double ProductSubTotal { get; set; }
        public double TotalCount { get; set; }
        public double ServiceSubTotal { get; set; }
        public string CustomerReminder { get; set; }
        public DateTime MaturityDate { get; set; }
        public string SupplierReqNum { get; set; }
        public string TrackingNum { get; set; }
        public string ProductSendMethod { get; set; }
        public string ProductSendType { get; set; }
        public string PhasedDelivery { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentDesc { get; set; }
        public string Category { get; set; }
        public string Terms { get; set; }
        public string Notes { get; set; }
        public byte[] Files { get; set; }
        public string BillSendGeoLoc { get; set; }
        public string BillCountry { get; set; }
        public string BillState { get; set; }
        public string BillCity { get; set; }
        public string BillPostalCode { get; set; }
        public string BillAddress { get; set; }
        public string BillLat { get; set; }
        public string BillLong { get; set; }
        public string ProdSendGeoLoc { get; set; }
        public string ProdCountry { get; set; }
        public string ProdState { get; set; }
        public string ProdCity { get; set; }
        public string ProdPostalCode { get; set; }
        public string ProdAddress { get; set; }
        public string ProdLat { get; set; }
        public string ProdLong { get; set; }
    }
}
