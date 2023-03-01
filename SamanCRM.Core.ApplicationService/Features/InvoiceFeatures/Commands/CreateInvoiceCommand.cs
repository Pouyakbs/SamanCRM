using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.InvoiceFeatures.Commands
{
    public class CreateInvoiceCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string InvoiceNum { get; set; }
        public string Status { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string RelatedTo { get; set; }
        public string RelatedToInput { get; set; }
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
        public int PersonsID { get; set; }
        public int PreInvoiceID { get; set; }
        public int AccountID { get; set; }
        public List<string> ProductsID { get; set; }
        public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, int>
        {
            private readonly IInvoiceFacade invoiceFacade;

            public CreateInvoiceCommandHandler(IInvoiceFacade invoiceFacade)
            {
                this.invoiceFacade = invoiceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateInvoiceCommand command, CancellationToken cancellationToken)
            {
                var invoiceDTO = new InvoiceDTO();
                invoiceDTO.AccountID = command.AccountID;
                invoiceDTO.Address = command.Address;
                invoiceDTO.City = command.City;
                invoiceDTO.Country = command.Country;
                invoiceDTO.OtherAddress = command.OtherAddress;
                invoiceDTO.OtherCity = command.OtherCity;
                invoiceDTO.OtherCountry = command.OtherCountry;
                invoiceDTO.PersonsID = command.PersonsID;
                invoiceDTO.PreInvoiceID = command.PreInvoiceID;
                invoiceDTO.CustomerSMS = command.CustomerSMS;
                invoiceDTO.Desc = command.Desc;
                invoiceDTO.Discount = command.Discount;
                invoiceDTO.GeographyLoc = command.GeographyLoc;
                invoiceDTO.OtherGeographyLoc = command.OtherGeographyLoc;
                invoiceDTO.GoodJobDeposit = command.GoodJobDeposit;
                invoiceDTO.GoodJobDepositPercentage = command.GoodJobDepositPercentage;
                invoiceDTO.InsuranceAmount = command.InsuranceAmount;
                invoiceDTO.InsuranceAmountPercentage = command.InsuranceAmountPercentage;
                invoiceDTO.InternalVerify = command.InternalVerify;
                invoiceDTO.InternalVerifyProblems = command.InternalVerifyProblems;
                invoiceDTO.InvoiceDate = command.InvoiceDate;
                invoiceDTO.InvoiceNum = command.InvoiceNum;
                invoiceDTO.Lat = command.Lat;
                invoiceDTO.Long = command.Long;
                invoiceDTO.OtherLat = command.OtherLat;
                invoiceDTO.OtherLong = command.OtherLong;
                invoiceDTO.MoneyUnit = command.MoneyUnit;
                invoiceDTO.Note = command.Note;
                invoiceDTO.OtherAdditions = command.OtherAdditions;
                invoiceDTO.PaymentConditions = command.PaymentConditions;
                invoiceDTO.PostalCode = command.PostalCode;
                invoiceDTO.OtherPostalCode = command.OtherPostalCode;
                invoiceDTO.PreInvoiceNum = command.PreInvoiceNum;
                invoiceDTO.PreInvoiceSenderCompany = command.PreInvoiceSenderCompany;
                invoiceDTO.PreInvoicePrintFrame = command.PreInvoicePrintFrame;
                invoiceDTO.ProductSendMethod = command.ProductSendMethod;
                invoiceDTO.ProductSendType = command.ProductSendType;
                invoiceDTO.Project = command.Project;
                invoiceDTO.ReferenceCode = command.ReferenceCode;
                invoiceDTO.RelatedTo = command.RelatedTo;
                invoiceDTO.RelatedToInput = command.RelatedToInput;
                invoiceDTO.Shipment = command.Shipment;
                invoiceDTO.ShipmentTax = command.ShipmentTax;
                invoiceDTO.ShipmentTaxPercentage = command.ShipmentTaxPercentage;
                invoiceDTO.State = command.State;
                invoiceDTO.OtherState = command.OtherState;
                invoiceDTO.Status = command.Status;
                invoiceDTO.SubTotal = command.SubTotal;
                invoiceDTO.Tax = command.Tax;
                invoiceDTO.Title = command.Title;
                invoiceDTO.Total = command.Total;
                invoiceDTO.TotalCount = command.TotalCount;
                invoiceDTO.TotalReceivable = command.TotalReceivable;
                invoiceDTO.User = command.User;
                invoiceDTO.ValidityLimit = command.ValidityLimit;
                invoiceDTO.ProductsID = command.ProductsID;
                invoiceDTO.CreatedDate = DateTime.Now;
                invoiceDTO.InvoiceGuid = Guid.NewGuid();
                invoiceFacade.Add(invoiceDTO);
                return invoiceDTO.InvoiceID;
            }
        }
    }
}
