using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CluesFeatures.Commands
{
    public class UpdateClueCommand : IRequest<int>
    {
        public int ClueID { get; set; }
        public string Type { get; set; }
        public string NickName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AccountName { get; set; }
        public string ClueSource { get; set; }
        public string ContactFields { get; set; }
        public string Emails { get; set; }
        public string Website { get; set; }
        public string Segment { get; set; }
        public string Status { get; set; }
        public string Desc { get; set; }
        public string Attractiveness { get; set; }
        public string ClueCampaign { get; set; }
        public string Industry { get; set; }
        public string SubIndustry { get; set; }
        public string RefferedBy { get; set; }
        public DateTime BirthDate { get; set; }
        public string NationalCode { get; set; }
        public string EcoCode { get; set; }
        public string SubNumber { get; set; }
        public string GeographyCode { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string OtherGeographyCode { get; set; }
        public string OtherCountry { get; set; }
        public string OtherState { get; set; }
        public string OtherCity { get; set; }
        public string OtherPostalCode { get; set; }
        public string OtherAddress { get; set; }
        public string OtherLat { get; set; }
        public string OtherLong { get; set; }
        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string LinkedIn { get; set; }
        public string Blog { get; set; }
        public class UpdateClueCommandHandler : IRequestHandler<UpdateClueCommand, int>
        {
            private readonly ICluesFacade clueFacade;

            public UpdateClueCommandHandler(ICluesFacade clueFacade)
            {
                this.clueFacade = clueFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateClueCommand command, CancellationToken cancellationToken)
            {
                var clueDTO = new CluesDTO();
                clueDTO.ClueID = command.ClueID;
                clueDTO.AccountName = command.AccountName;
                clueDTO.Address = command.Address;
                clueDTO.OtherAddress = command.OtherAddress;
                clueDTO.Attractiveness = command.Attractiveness;
                clueDTO.BirthDate = command.BirthDate;
                clueDTO.Blog = command.Blog;
                clueDTO.ClueCampaign = command.ClueCampaign;
                clueDTO.City = command.City;
                clueDTO.OtherCity = command.OtherCity;
                clueDTO.ClueSource = command.ClueSource;
                clueDTO.Type = command.Type;
                clueDTO.NickName = command.NickName;
                clueDTO.Country = command.Country;
                clueDTO.OtherCountry = command.OtherCountry;
                clueDTO.Desc = command.Desc;
                clueDTO.EcoCode = command.EcoCode;
                clueDTO.Emails = command.Emails;
                clueDTO.Facebook = command.Facebook;
                clueDTO.FirstName = command.FirstName;
                clueDTO.GeographyCode = command.GeographyCode;
                clueDTO.OtherGeographyCode = command.OtherGeographyCode;
                clueDTO.Industry = command.Industry;
                clueDTO.SubIndustry = command.SubIndustry;
                clueDTO.Instagram = command.Instagram;
                clueDTO.LastName = command.LastName;
                clueDTO.Lat = command.Lat;
                clueDTO.OtherLat = command.OtherLat;
                clueDTO.LinkedIn = command.LinkedIn;
                clueDTO.Long = command.Long;
                clueDTO.OtherLong = command.OtherLong;
                clueDTO.NationalCode = command.NationalCode;
                clueDTO.ContactFields = command.ContactFields;
                clueDTO.PostalCode = command.PostalCode;
                clueDTO.OtherPostalCode = command.OtherPostalCode;
                clueDTO.RefferedBy = command.RefferedBy;
                clueDTO.State = command.State;
                clueDTO.OtherState = command.OtherState;
                clueDTO.Segment = command.Segment;
                clueDTO.Status = command.Status;
                clueDTO.SubNumber = command.SubNumber;
                clueDTO.Twitter = command.Twitter;
                clueDTO.Website = command.Website;
                clueFacade.Update(clueDTO);
                return clueDTO.ClueID;
            }
        }
    }
}
