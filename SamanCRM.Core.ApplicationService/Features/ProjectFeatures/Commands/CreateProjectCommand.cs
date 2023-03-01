using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProjectFeatures.Commands
{
    public class CreateProjectCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ProjectType { get; set; }
        public string Importance { get; set; }
        public string MainAcc { get; set; }
        public string User { get; set; }
        public string MainSendGeoLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string MainAddress { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string AccountantNum { get; set; }
        public string Clue { get; set; }
        public string Desc { get; set; }
        public string Log { get; set; }
        public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, int>
        {
            private readonly IProjectFacade projectFacade;

            public CreateProjectCommandHandler(IProjectFacade projectFacade)
            {
                this.projectFacade = projectFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateProjectCommand command, CancellationToken cancellationToken)
            {
                var projectDTO = new ProjectDTO();
                projectDTO.AccountantNum = command.AccountantNum;
                projectDTO.City = command.City;
                projectDTO.Clue = command.Clue;
                projectDTO.Country = command.Country;
                projectDTO.Desc = command.Desc;
                projectDTO.EndDate = command.EndDate;
                projectDTO.Importance = command.Importance;
                projectDTO.Lat = command.Lat;
                projectDTO.Log = command.Log;
                projectDTO.Long = command.Long;
                projectDTO.MainAcc = command.MainAcc;
                projectDTO.MainAddress = command.MainAddress;
                projectDTO.MainSendGeoLoc = command.MainSendGeoLoc;
                projectDTO.Name = command.Name;
                projectDTO.PostalCode = command.PostalCode;
                projectDTO.ProjectType = command.ProjectType;
                projectDTO.StartDate = command.StartDate;
                projectDTO.State = command.State;
                projectDTO.Status = command.Status;
                projectDTO.User = command.User;
                projectDTO.CreatedDate = DateTime.Now;
                projectDTO.ProjectGuid = Guid.NewGuid();
                projectFacade.Add(projectDTO);
                return projectDTO.ProjectID;
            }
        }
    }
}
