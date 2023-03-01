using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PreInvoiceFeatures.Commands
{
    public class CreatePreInvoiceCommand : IRequest<int>
    {
        public string Title { get; set; }
        public string PreInvoiceNum { get; set; }
        public string PreInvoiceLevel { get; set; }
        public string Customer { get; set; }
        public DateTime PreInvoiceDate { get; set; }
        public string RelatedTo { get; set; }
        public string RelatedToInput { get; set; }
        public DateTime ValidityDate { get; set; }
        public string InvoiceState { get; set; }
        public string Project { get; set; }
        public string User { get; set; }
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
        public double TotalNum { get; set; }
        public string Note { get; set; }
        public string Desc { get; set; }
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
        public int OpportunitiesID { get; set; }
        public int AccountID { get; set; }
        public int PersonsID { get; set; }
        public List<string> ProductsID { get; set; }
        public class CreatePreInvoiceCommandHandler : IRequestHandler<CreatePreInvoiceCommand, int>
        {
            private readonly IPreInvoiceFacade preInvoiceFacade;

            public CreatePreInvoiceCommandHandler(IPreInvoiceFacade preInvoiceFacade)
            {
                this.preInvoiceFacade = preInvoiceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreatePreInvoiceCommand command, CancellationToken cancellationToken)
            {
                var preInvoiceDTO = new PreInvoiceDTO();
                preInvoiceDTO.AccountID = command.AccountID;
                preInvoiceDTO.Address = command.Address;
                preInvoiceDTO.OtherAddress = command.OtherAddress;
                preInvoiceDTO.City = command.City;
                preInvoiceDTO.OtherCity = command.OtherCity;
                preInvoiceDTO.Country = command.Country;
                preInvoiceDTO.OtherCountry = command.OtherCountry;
                preInvoiceDTO.Customer = command.Customer;
                preInvoiceDTO.CustomerSMS = command.CustomerSMS;
                preInvoiceDTO.Desc = command.Desc;
                preInvoiceDTO.OpportunitiesID = command.OpportunitiesID;
                preInvoiceDTO.Discount = command.Discount;
                preInvoiceDTO.GeographyLoc = command.GeographyLoc;
                preInvoiceDTO.PersonsID = command.PersonsID;
                preInvoiceDTO.OtherGeographyLoc = command.OtherGeographyLoc;
                preInvoiceDTO.GoodJobDeposit = command.GoodJobDeposit;
                preInvoiceDTO.GoodJobDepositPercentage = command.GoodJobDepositPercentage;
                preInvoiceDTO.InsuranceAmount = command.InsuranceAmount;
                preInvoiceDTO.InsuranceAmountPercentage = command.InsuranceAmountPercentage;
                preInvoiceDTO.InternalVerify = command.InternalVerify;
                preInvoiceDTO.InternalVerifyProblems = command.InternalVerifyProblems;
                preInvoiceDTO.InvoiceState = command.InvoiceState;
                preInvoiceDTO.Lat = command.Lat;
                preInvoiceDTO.OtherLat = command.OtherLat;
                preInvoiceDTO.ProductsID = command.ProductsID;
                preInvoiceDTO.Long = command.Long;
                preInvoiceDTO.OtherLong = command.OtherLong;
                preInvoiceDTO.MoneyUnit = command.MoneyUnit;
                preInvoiceDTO.Note = command.Note;
                preInvoiceDTO.OtherAdditions = command.OtherAdditions;
                preInvoiceDTO.PaymentConditions = command.PaymentConditions;
                preInvoiceDTO.PostalCode = command.PostalCode;
                preInvoiceDTO.OtherPostalCode = command.OtherPostalCode;
                preInvoiceDTO.PreInvoiceDate = command.PreInvoiceDate;
                preInvoiceDTO.PreInvoiceLevel = command.PreInvoiceLevel;
                preInvoiceDTO.PreInvoiceNum = command.PreInvoiceNum;
                preInvoiceDTO.PreInvoiceSenderCompany = command.PreInvoiceSenderCompany;
                preInvoiceDTO.PreInvoicePrintFrame = command.PreInvoicePrintFrame;
                preInvoiceDTO.ProductSendMethod = command.ProductSendMethod;
                preInvoiceDTO.ProductSendType = command.ProductSendType;
                preInvoiceDTO.Project = command.Project;
                preInvoiceDTO.RelatedTo = command.RelatedTo;
                preInvoiceDTO.RelatedToInput = command.RelatedToInput;
                preInvoiceDTO.Shipment = command.Shipment;
                preInvoiceDTO.ShipmentTax = command.ShipmentTax;
                preInvoiceDTO.ShipmentTaxPercentage = command.ShipmentTaxPercentage;
                preInvoiceDTO.State = command.State;
                preInvoiceDTO.OtherState = command.OtherState;
                preInvoiceDTO.SubTotal = command.SubTotal;
                preInvoiceDTO.Tax = command.Tax;
                preInvoiceDTO.Title = command.Title;
                preInvoiceDTO.Total = command.Total;
                preInvoiceDTO.TotalCount = command.TotalCount;
                preInvoiceDTO.TotalNum = command.TotalNum;
                preInvoiceDTO.TotalReceivable = command.TotalReceivable;
                preInvoiceDTO.User = command.User;
                preInvoiceDTO.ValidityDate = command.ValidityDate;
                preInvoiceDTO.ValidityLimit = command.ValidityLimit;
                preInvoiceDTO.CreatedDate = DateTime.Now;
                preInvoiceDTO.PreInvoiceGuid = Guid.NewGuid();
                preInvoiceFacade.Add(preInvoiceDTO);
                return preInvoiceDTO.PreInvoiceID;
            }
        }
    }
}
