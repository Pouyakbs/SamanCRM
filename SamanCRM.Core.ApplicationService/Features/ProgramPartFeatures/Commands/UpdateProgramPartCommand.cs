using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Commands
{
    public class UpdateProgramPartCommand : IRequest<int>
    {
        public int ID { get; set; }
        public int ParentID { get; set; }
        public string SystemName { get; set; }
        public string DisplayName { get; set; }
        public string Icon { get; set; }
        public int Priority { get; set; }
        public bool Active { get; set; }
        public string Type { get; set; }
        public string RouteName { get; set; }
        public int RoleID { get; set; }
        public class UpdateProgramPartCommandHandler : IRequestHandler<UpdateProgramPartCommand, int>
        {
            private readonly IProgramPartFacade programPartFacade;

            public UpdateProgramPartCommandHandler(IProgramPartFacade programPartFacade)
            {
                this.programPartFacade = programPartFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateProgramPartCommand command, CancellationToken cancellationToken)
            {
                var programPartDTO = new ProgramPartDTO();
                programPartDTO.ID = command.ID;
                programPartDTO.ParentID = command.ParentID;
                programPartDTO.RouteName = command.RouteName;
                programPartDTO.SystemName = command.SystemName;
                programPartDTO.DisplayName = command.DisplayName;
                programPartDTO.Icon = command.Icon;
                programPartDTO.Priority = command.Priority;
                programPartDTO.Active = command.Active;
                programPartDTO.Type = command.Type;
                programPartDTO.RoleID = command.RoleID;
                programPartFacade.Update(programPartDTO);
                return programPartDTO.ID;
            }
        }
    }
}
