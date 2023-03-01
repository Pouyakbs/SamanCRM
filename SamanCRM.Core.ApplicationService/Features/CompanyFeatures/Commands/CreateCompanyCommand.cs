using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompanyFeatures.Commands
{
    public class CreateCompanyCommand : IRequest<int>
    {
        public string CompanyName { get; set; }
        public string CompanyTitle { get; set; }
        public string SubNumber { get; set; }
        public string EcoCode { get; set; }
        public string NationalNum { get; set; }
        public byte[] Logo { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string OfficePhone { get; set; }
        public string Fax { get; set; }
        public string BankAccNum { get; set; }
        public string BankCardNum { get; set; }
        public string ShebaNum { get; set; }
        public string BankName { get; set; }
        public string AccountOwner { get; set; }
        public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommand, int>
        {
            private readonly ICompanyFacade companyFacade;

            public CreateCompanyCommandHandler(ICompanyFacade companyFacade)
            {
                this.companyFacade = companyFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateCompanyCommand command, CancellationToken cancellationToken)
            {
                var companyDTO = new CompanyDTO();
                companyDTO.AccountOwner = command.AccountOwner;
                companyDTO.Address = command.Address;
                companyDTO.BankAccNum = command.BankAccNum;
                companyDTO.BankCardNum = command.BankCardNum;
                companyDTO.BankName = command.BankName;
                companyDTO.City = command.City;
                companyDTO.CompanyName = command.CompanyName;
                companyDTO.CompanyTitle = command.CompanyTitle;
                companyDTO.EcoCode = command.EcoCode;
                companyDTO.Fax = command.Fax;
                companyDTO.Logo = command.Logo;
                companyDTO.NationalNum = command.NationalNum;
                companyDTO.OfficePhone = command.OfficePhone;
                companyDTO.PostalCode = command.PostalCode;
                companyDTO.ShebaNum = command.ShebaNum;
                companyDTO.State = command.State;
                companyDTO.SubNumber = command.SubNumber;
                companyDTO.CreatedDate = DateTime.Now;
                companyDTO.CompanyGuid = Guid.NewGuid();
                companyFacade.Add(companyDTO);
                return companyDTO.CompanyID;
            }
        }
    }
}
