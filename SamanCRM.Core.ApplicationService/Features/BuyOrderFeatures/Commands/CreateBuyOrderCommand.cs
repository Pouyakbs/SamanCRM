using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BuyOrderFeatures.Commands
{
    public class CreateBuyOrderCommand : IRequest<int>
    {
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
        public List<string> Files { get; set; }
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
        public int SupplierID { get; set; }
        public class CreateBuyOrderCommandHandler : IRequestHandler<CreateBuyOrderCommand, int>
        {
            private readonly IBuyOrderFacade buyOrderFacade;

            public CreateBuyOrderCommandHandler(IBuyOrderFacade buyOrderFacade)
            {
                this.buyOrderFacade = buyOrderFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateBuyOrderCommand command, CancellationToken cancellationToken)
            {
                var buyOrderDTO = new BuyOrderDTO();
                buyOrderDTO.BillAddress = command.BillAddress;
                buyOrderDTO.BillCity = command.BillCity;
                buyOrderDTO.BillCountry = command.BillCountry;
                buyOrderDTO.BillLat = command.BillLat;
                buyOrderDTO.BillLong = command.BillLong;
                buyOrderDTO.BillPostalCode = command.BillPostalCode;
                buyOrderDTO.BillSendGeoLoc = command.BillSendGeoLoc;
                buyOrderDTO.BillState = command.BillState;
                buyOrderDTO.Category = command.Category;
                buyOrderDTO.Customer = command.Customer;
                buyOrderDTO.CustomerReminder = command.CustomerReminder;
                buyOrderDTO.Discount = command.Discount;
                buyOrderDTO.Totalprice = command.Totalprice;
                buyOrderDTO.Files = command.Files;
                buyOrderDTO.Subset = command.Subset;
                buyOrderDTO.Transport = command.Transport;
                buyOrderDTO.ForOpportunity = command.ForOpportunity;
                buyOrderDTO.MoneyUnit = command.MoneyUnit;
                buyOrderDTO.Name = command.Name;
                buyOrderDTO.Notes = command.Notes;
                buyOrderDTO.Number = command.Number;
                buyOrderDTO.OrderDate = command.OrderDate;
                buyOrderDTO.TransportTax = command.TransportTax;
                buyOrderDTO.PaymentDesc = command.PaymentDesc;
                buyOrderDTO.PaymentMethod = command.PaymentMethod;
                buyOrderDTO.PaymentStatus = command.PaymentStatus;
                buyOrderDTO.PhasedDelivery = command.PhasedDelivery;
                buyOrderDTO.ProdAddress = command.ProdAddress;
                buyOrderDTO.ProdCity = command.ProdCity;
                buyOrderDTO.ProdCountry = command.ProdCountry;
                buyOrderDTO.ProdLat = command.ProdLat;
                buyOrderDTO.ProdLong = command.ProdLong;
                buyOrderDTO.ProdPostalCode = command.ProdPostalCode;
                buyOrderDTO.ProdSendGeoLoc = command.ProdSendGeoLoc;
                buyOrderDTO.ProdState = command.ProdState;
                buyOrderDTO.ProductSendMethod = command.ProductSendMethod;
                buyOrderDTO.ProductSendType = command.ProductSendType;
                buyOrderDTO.ProductSubTotal = command.ProductSubTotal;
                buyOrderDTO.ServiceSubTotal = command.ServiceSubTotal;
                buyOrderDTO.TaxRate = command.TaxRate;
                buyOrderDTO.ProductList = command.ProductList;
                buyOrderDTO.Status = command.Status;
                buyOrderDTO.OtherExpenses = command.OtherExpenses;
                buyOrderDTO.TotalCount = command.TotalCount;
                buyOrderDTO.SupplierReqNum = command.SupplierReqNum;
                buyOrderDTO.Tax = command.Tax;
                buyOrderDTO.Terms = command.Terms;
                buyOrderDTO.MaturityDate = command.MaturityDate;
                buyOrderDTO.TotalAmount = command.TotalAmount;
                buyOrderDTO.SupplierID = command.SupplierID;
                buyOrderDTO.TrackingNum = command.TrackingNum;
                buyOrderDTO.CreatedDate = DateTime.Now;
                buyOrderDTO.OrderGuid = Guid.NewGuid();
                buyOrderFacade.Add(buyOrderDTO);
                return buyOrderDTO.OrderID;
            }
        }
    }
}
