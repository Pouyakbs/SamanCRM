using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServicesFeatures.Commands
{
    public class UpdateServiceCommand : IRequest<int>
    {
        public int ServiceID { get; set; }
        public string Subject { get; set; }
        public string ServiceNum { get; set; }
        public string Desc { get; set; }
        public string Status { get; set; }
        public string TeamName { get; set; }
        public string ServiceType { get; set; }
        public string FirstLayerUser { get; set; }
        public string SecondLayerUser { get; set; }
        public string CustomerReason { get; set; }
        public string ServiceReason { get; set; }
        public string Priority { get; set; }
        public string Intensity { get; set; }
        public string AnnounceChannel { get; set; }
        public string Category { get; set; }
        public DateTime ReceiveDate { get; set; }
        public string Time { get; set; }
        public string InstallLoc { get; set; }
        public string DeviceLoc { get; set; }
        public string DeviceLocInput { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string FileTitle { get; set; }
        public byte[] Files { get; set; }
        public string InternalDesc { get; set; }
        public string Solution { get; set; }
        public int PersonsID { get; set; }
        public int AccountID { get; set; }
        public List<string> ProductFields { get; set; }
        public class UpdateServiceCommandHandler : IRequestHandler<UpdateServiceCommand, int>
        {
            private readonly IServicesFacade serviceFacade;

            public UpdateServiceCommandHandler(IServicesFacade serviceFacade)
            {
                this.serviceFacade = serviceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateServiceCommand command, CancellationToken cancellationToken)
            {
                var serviceDTO = new ServicesDTO();
                serviceDTO.ServiceID = command.ServiceID;
                serviceDTO.AccountID = command.AccountID;
                serviceDTO.Address = command.Address;
                serviceDTO.AnnounceChannel = command.AnnounceChannel;
                serviceDTO.Category = command.Category;
                serviceDTO.City = command.City;
                serviceDTO.Country = command.Country;
                serviceDTO.PersonsID = command.PersonsID;
                serviceDTO.CustomerReason = command.CustomerReason;
                serviceDTO.Desc = command.Desc;
                serviceDTO.DeviceLoc = command.DeviceLoc;
                serviceDTO.DeviceLocInput = command.DeviceLocInput;
                serviceDTO.Files = command.Files;
                serviceDTO.FileTitle = command.FileTitle;
                serviceDTO.FirstLayerUser = command.FirstLayerUser;
                serviceDTO.GeographyLoc = command.GeographyLoc;
                serviceDTO.InstallLoc = command.InstallLoc;
                serviceDTO.Intensity = command.Intensity;
                serviceDTO.InternalDesc = command.InternalDesc;
                serviceDTO.Time = command.Time;
                serviceDTO.Lat = command.Lat;
                serviceDTO.Long = command.Long;
                serviceDTO.PostalCode = command.PostalCode;
                serviceDTO.Priority = command.Priority;
                serviceDTO.ProductFields = command.ProductFields;
                serviceDTO.ReceiveDate = command.ReceiveDate;
                serviceDTO.SecondLayerUser = command.SecondLayerUser;
                serviceDTO.ServiceNum = command.ServiceNum;
                serviceDTO.ServiceReason = command.ServiceReason;
                serviceDTO.ServiceType = command.ServiceType;
                serviceDTO.Solution = command.Solution;
                serviceDTO.State = command.State;
                serviceDTO.Status = command.Status;
                serviceDTO.Subject = command.Subject;
                serviceDTO.TeamName = command.TeamName;
                serviceFacade.Update(serviceDTO);
                return serviceDTO.ServiceID;
            }
        }
    }
}
