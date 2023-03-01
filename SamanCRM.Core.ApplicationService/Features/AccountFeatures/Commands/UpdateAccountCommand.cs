using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AccountFeatures.Commands
{
    public class UpdateAccountCommand : IRequest<int>
    {
        public int AccountID { get; set; }
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public string User { get; set; }
        public string Fax { get; set; }
        public string ContactFields { get; set; }
        public string Emails { get; set; }
        public string Website { get; set; }
        public string Status { get; set; }
        public string Desc { get; set; }
        public string Attractiveness { get; set; }
        public string AnotherName { get; set; }
        public string Campaign { get; set; }
        public string Ownership { get; set; }
        public string Industry { get; set; }
        public string SubIndustry { get; set; }
        public string RefferedBy { get; set; }
        public string Member { get; set; }
        public string NationalNum { get; set; }
        public string EcoCode { get; set; }
        public string SubNumber { get; set; }
        public string GeographyCode { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string OtherGeographicalArea { get; set; }
        public string OtherCountry { get; set; }
        public string Otherstate { get; set; }
        public string Othercity { get; set; }
        public string OtherPostalCode { get; set; }
        public string Otheraddress { get; set; }
        public string Otherlatitude { get; set; }
        public string Otherlongitude { get; set; }
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Blog { get; set; }
        public string ValidityStatus { get; set; }
        public string ValidityType { get; set; }
        public DateTime ExpireTime { get; set; }
        public string ValiditySource { get; set; }
        public string ValidityLimit { get; set; }
        public string ValiditySourceDesc { get; set; }
        public double SaleDiscount { get; set; }
        public class UpdateAccountCommandHandler : IRequestHandler<UpdateAccountCommand, int>
        {
            private readonly IAccountFacade accountFacade;

            public UpdateAccountCommandHandler(IAccountFacade accountFacade)
            {
                this.accountFacade = accountFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateAccountCommand command, CancellationToken cancellationToken)
            {
                var accountDTO = new AccountDTO();
                accountDTO.AccountID = command.AccountID; 
                accountDTO.AccountName = command.AccountName;
                accountDTO.NickName = command.NickName;
                accountDTO.Name = command.Name;
                accountDTO.Surname = command.Surname;
                accountDTO.AccountType = command.AccountType;
                accountDTO.AnotherName = command.AnotherName;
                accountDTO.Ownership = command.Ownership;
                accountDTO.SubIndustry = command.SubIndustry;
                accountDTO.Address = command.Address;
                accountDTO.Attractiveness = command.Attractiveness;
                accountDTO.Blog = command.Blog;
                accountDTO.Campaign = command.Campaign;
                accountDTO.City = command.City;
                accountDTO.Country = command.Country;
                accountDTO.Desc = command.Desc;
                accountDTO.EcoCode = command.EcoCode;
                accountDTO.Emails = command.Emails;
                accountDTO.ExpireTime = command.ExpireTime;
                accountDTO.Facebook = command.Facebook;
                accountDTO.Fax = command.Fax;
                accountDTO.GeographyCode = command.GeographyCode;
                accountDTO.OtherGeographicalArea = command.OtherGeographicalArea;
                accountDTO.OtherCountry = command.OtherCountry;
                accountDTO.Otherstate = command.Otherstate;
                accountDTO.Othercity = command.Othercity;
                accountDTO.OtherPostalCode = command.OtherPostalCode;
                accountDTO.Otheraddress = command.Otheraddress;
                accountDTO.Otherlatitude = command.Otherlatitude;
                accountDTO.Otherlongitude = command.Otherlongitude;
                accountDTO.Industry = command.Industry;
                accountDTO.Instagram = command.Instagram;
                accountDTO.ContactFields = command.ContactFields;
                accountDTO.Latitude = command.Latitude;
                accountDTO.LinkedIn = command.LinkedIn;
                accountDTO.Longitude = command.Longitude;
                accountDTO.Member = command.Member;
                accountDTO.NationalNum = command.NationalNum;
                accountDTO.PostalCode = command.PostalCode;
                accountDTO.RefferedBy = command.RefferedBy;
                accountDTO.SaleDiscount = command.SaleDiscount;
                accountDTO.State = command.State;
                accountDTO.Status = command.Status;
                accountDTO.SubNumber = command.SubNumber;
                accountDTO.Twitter = command.Twitter;
                accountDTO.User = command.User;
                accountDTO.ValidityLimit = command.ValidityLimit;
                accountDTO.ValiditySource = command.ValiditySource;
                accountDTO.ValiditySourceDesc = command.ValiditySourceDesc;
                accountDTO.ValidityStatus = command.ValidityStatus;
                accountDTO.ValidityType = command.ValidityType;
                accountDTO.Website = command.Website;
                accountFacade.Update(accountDTO);
                return accountDTO.AccountID;
            }
        }
    }
}
