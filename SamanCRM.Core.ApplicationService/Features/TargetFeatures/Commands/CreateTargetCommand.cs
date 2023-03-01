using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.TargetFeatures.Commands
{
    public class CreateTargetCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string OfficePhone { get; set; }
        public string PhoneNum { get; set; }
        public string HomeNum { get; set; }
        public string OtherPhoneNum { get; set; }
        public string Title { get; set; }
        public string Unit { get; set; }
        public DateTime BirthDate { get; set; }
        public string Fax { get; set; }
        public string AccountName { get; set; }
        public string SecretaryName { get; set; }
        public string User { get; set; }
        public bool CallMe { get; set; }
        public string Email { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string MainAddress { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string Desc { get; set; }
        public class CreateTargetCommandHandler : IRequestHandler<CreateTargetCommand, int>
        {
            private readonly ITargetFacade targetFacade;

            public CreateTargetCommandHandler(ITargetFacade targetFacade)
            {
                this.targetFacade = targetFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateTargetCommand command, CancellationToken cancellationToken)
            {
                var targetDTO = new TargetDTO();
                targetDTO.AccountName = command.AccountName;
                targetDTO.BirthDate = command.BirthDate;
                targetDTO.CallMe = command.CallMe;
                targetDTO.City = command.City;
                targetDTO.Country = command.Country;
                targetDTO.Desc = command.Desc;
                targetDTO.Email = command.Email;
                targetDTO.Fax = command.Fax;
                targetDTO.GeographyLoc = command.GeographyLoc;
                targetDTO.HomeNum = command.HomeNum;
                targetDTO.Lat = command.Lat;
                targetDTO.Long = command.Long;
                targetDTO.MainAddress = command.MainAddress;
                targetDTO.Name = command.Name;
                targetDTO.OfficePhone = command.OfficePhone;
                targetDTO.OtherPhoneNum = command.OtherPhoneNum;
                targetDTO.PhoneNum = command.PhoneNum;
                targetDTO.PostalCode = command.PostalCode;
                targetDTO.SecretaryName = command.SecretaryName;
                targetDTO.State = command.State;
                targetDTO.Surname = command.Surname;
                targetDTO.Title = command.Title;
                targetDTO.Unit = command.Unit;
                targetDTO.User = command.User;
                targetDTO.CreatedDate = DateTime.Now;
                targetDTO.TargetGuid = Guid.NewGuid();
                targetFacade.Add(targetDTO);
                return targetDTO.TargetID;
            }
        }
    }
}
