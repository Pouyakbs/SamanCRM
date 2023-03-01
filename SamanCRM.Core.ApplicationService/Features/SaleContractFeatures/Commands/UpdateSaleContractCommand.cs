using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SaleContractFeatures.Commands
{
    public class UpdateSaleContractCommand : IRequest<int>
    {
        public int ContractID { get; set; }
        public string ContractTitle { get; set; }
        public string Status { get; set; }
        public string RelatedTo { get; set; }
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
        public class UpdateSaleContractCommandHandler : IRequestHandler<UpdateSaleContractCommand, int>
        {
            private readonly ISaleContractFacade saleContractFacade;

            public UpdateSaleContractCommandHandler(ISaleContractFacade saleContractFacade)
            {
                this.saleContractFacade = saleContractFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateSaleContractCommand command, CancellationToken cancellationToken)
            {
                var saleContractDTO = new SaleContractDTO();
                saleContractDTO.ContractID = command.ContractID;
                saleContractDTO.CompanySignDate = command.CompanySignDate;
                saleContractDTO.ContractManager = command.ContractManager;
                saleContractDTO.ContractTitle = command.ContractTitle;
                saleContractDTO.ContractType = command.ContractType;
                saleContractDTO.Customer = command.Customer;
                saleContractDTO.CustomerSignDate = command.CustomerSignDate;
                saleContractDTO.Desc = command.Desc;
                saleContractDTO.Discount = command.Discount;
                saleContractDTO.EndDate = command.EndDate;
                saleContractDTO.ForecastSale = command.ForecastSale;
                saleContractDTO.GoodJobDeposit = command.GoodJobDeposit;
                saleContractDTO.GuaranteeObligations = command.GuaranteeObligations;
                saleContractDTO.InsuranceDepositAmount = command.InsuranceDepositAmount;
                saleContractDTO.InvoicedTill = command.InvoicedTill;
                saleContractDTO.InvoiceSenderCompany = command.InvoiceSenderCompany;
                saleContractDTO.InvoiceSendPeriod = command.InvoiceSendPeriod;
                saleContractDTO.InvoiceSendType = command.InvoiceSendType;
                saleContractDTO.MoneyUnit = command.MoneyUnit;
                saleContractDTO.OtherAdditions = command.OtherAdditions;
                saleContractDTO.ReferenceCode = command.ReferenceCode;
                saleContractDTO.RelatedTo = command.RelatedTo;
                saleContractDTO.RememberExtentionDate = command.RememberExtentionDate;
                saleContractDTO.SaleOpportunity = command.SaleOpportunity;
                saleContractDTO.Shipment = command.Shipment;
                saleContractDTO.ShipmentTax = command.ShipmentTax;
                saleContractDTO.StartDate = command.StartDate;
                saleContractDTO.Status = command.Status;
                saleContractDTO.SubTotal = command.SubTotal;
                saleContractDTO.SuccessRate = command.SuccessRate;
                saleContractDTO.Tax = command.Tax;
                saleContractDTO.Total = command.Total;
                saleContractDTO.TotalCount = command.TotalCount;
                saleContractFacade.Update(saleContractDTO);
                return saleContractDTO.ContractID;
            }
        }
    }
}
