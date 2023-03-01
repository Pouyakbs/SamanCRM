using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Commands
{
    public class UpdatePersonCommand : IRequest<int>
    {
        public int PersonID { get; set; }
        public string NickName { get; set; }
        public string PersonName { get; set; }
        public string Surname { get; set; }
        public string Segment { get; set; }
        public string AccountName { get; set; }
        public string ClueSource { get; set; }
        public string ContactFields { get; set; }
        public string Email { get; set; }
        public string Section { get; set; }
        public string Username { get; set; }
        public string Desc { get; set; }
        public string ManagerName { get; set; }
        public string SecretaryName { get; set; }
        public DateTime BirthDate { get; set; }
        public string NationalCode { get; set; }
        public string Status { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string OtherGeographyLoc { get; set; }
        public string OtherCountry { get; set; }
        public string OtherCity { get; set; }
        public string OtherState { get; set; }
        public string OtherLatitude { get; set; }
        public string OtherLongitude { get; set; }
        public string OtherAddress { get; set; }
        public string OtherPostalCode { get; set; }
        public string Instagram { get; set; }
        public string LinkedIn { get; set; }
        public string Twitter { get; set; }
        public string FaceBook { get; set; }
        public string Blog { get; set; }
        public int AccountID { get; set; }
        public class UpdatePersonCommandHandler : IRequestHandler<UpdatePersonCommand, int>
        {
            private readonly IPersonsFacade personsFacade;

            public UpdatePersonCommandHandler(IPersonsFacade personsFacade)
            {
                this.personsFacade = personsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdatePersonCommand command, CancellationToken cancellationToken)
            {
                var personsDTO = new PersonsDTO();
                personsDTO.PersonID = command.PersonID;
                personsDTO.Address = command.Address;
                personsDTO.BirthDate = command.BirthDate;
                personsDTO.City = command.City;
                personsDTO.Country = command.Country;
                personsDTO.Email = command.Email;
                personsDTO.NickName = command.NickName;
                personsDTO.PersonName = command.PersonName;
                personsDTO.Surname = command.Surname;
                personsDTO.GeographyLoc = command.GeographyLoc;
                personsDTO.Latitude = command.Latitude;
                personsDTO.Longitude = command.Longitude;
                personsDTO.ManagerName = command.ManagerName;
                personsDTO.NationalCode = command.NationalCode;
                personsDTO.ContactFields = command.ContactFields;
                personsDTO.PostalCode = command.PostalCode;
                personsDTO.Section = command.Section;
                personsDTO.Desc = command.Desc;
                personsDTO.OtherGeographyLoc = command.OtherGeographyLoc;
                personsDTO.OtherCountry = command.OtherCountry;
                personsDTO.OtherCity = command.OtherCity;
                personsDTO.OtherState = command.OtherState;
                personsDTO.OtherLatitude = command.OtherLatitude;
                personsDTO.OtherLongitude = command.OtherLongitude;
                personsDTO.OtherAddress = command.OtherAddress;
                personsDTO.OtherPostalCode = command.OtherPostalCode;
                personsDTO.Segment = command.Segment;
                personsDTO.State = command.State;
                personsDTO.Status = command.Status;
                personsDTO.Username = command.Username;
                personsDTO.AccountName = command.AccountName;
                personsDTO.ClueSource = command.ClueSource;
                personsDTO.SecretaryName = command.SecretaryName;
                personsDTO.Instagram = command.Instagram;
                personsDTO.LinkedIn = command.LinkedIn;
                personsDTO.Twitter = command.Twitter;
                personsDTO.FaceBook = command.FaceBook;
                personsDTO.Blog = command.Blog;
                personsDTO.AccountID = command.AccountID;
                personsFacade.Update(personsDTO);
                return personsDTO.PersonID;
            }
        }
    }
}
