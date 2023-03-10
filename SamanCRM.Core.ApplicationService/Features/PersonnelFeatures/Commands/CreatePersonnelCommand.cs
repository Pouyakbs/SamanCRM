using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Commands
{
    public class CreatePersonnelCommand : IRequest<int>
    {
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int orgPost { get; set; }
        public string contactFields { get; set; }
        public string InternalNum { get; set; }
        public string Email { get; set; }
        public string workingSection { get; set; }
        public string Username { get; set; }
        public string ManagerName { get; set; }
        public string WorkingUnit { get; set; }
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
        public class CreatePersonnelCommandHandler : IRequestHandler<CreatePersonnelCommand, int>
        {
            private readonly IPersonnelFacade personnelFacade;

            public CreatePersonnelCommandHandler(IPersonnelFacade personnelFacade)
            {
                this.personnelFacade = personnelFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreatePersonnelCommand command, CancellationToken cancellationToken)
            {
                var personnelDTO = new PersonnelDTO();
                personnelDTO.NickName = command.NickName;
                personnelDTO.Name = command.Name;
                personnelDTO.orgPost = command.orgPost;
                personnelDTO.Surname = command.Surname;
                personnelDTO.workingSection = command.workingSection;
                personnelDTO.WorkingUnit = command.WorkingUnit;
                personnelDTO.contactFields = command.contactFields;
                personnelDTO.Address = command.Address;
                personnelDTO.BirthDate = command.BirthDate;
                personnelDTO.City = command.City;
                personnelDTO.Country = command.Country;
                personnelDTO.Email = command.Email;
                personnelDTO.GeographyLoc = command.GeographyLoc;
                personnelDTO.InternalNum = command.InternalNum;
                personnelDTO.Latitude = command.Latitude;
                personnelDTO.Longitude = command.Longitude;
                personnelDTO.ManagerName = command.ManagerName;
                personnelDTO.NationalCode = command.NationalCode;
                personnelDTO.PostalCode = command.PostalCode;
                personnelDTO.State = command.State;
                personnelDTO.Status = command.Status;
                personnelDTO.Username = command.Username;
                personnelDTO.CreatedDate = DateTime.Now;
                personnelDTO.PersonnelGuid = Guid.NewGuid();
                personnelFacade.Add(personnelDTO);
                return personnelDTO.PersonnelID;
            }
        }
    }
}
