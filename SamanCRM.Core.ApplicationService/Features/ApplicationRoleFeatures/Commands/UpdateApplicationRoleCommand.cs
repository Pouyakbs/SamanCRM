using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationRoleFeatures.Commands
{
    public class UpdateApplicationRoleCommand : IRequest<int>
    {
        public int RoleID { get; set; }
        public string RoleName { get; set; }
        public int ParentID { get; set; }
        public class UpdateApplicationRoleCommandHandler : IRequestHandler<UpdateApplicationRoleCommand, int>
        {
            private readonly IApplicationRoleFacade applicationRoleFacade;

            public UpdateApplicationRoleCommandHandler(IApplicationRoleFacade applicationRoleFacade)
            {
                this.applicationRoleFacade = applicationRoleFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateApplicationRoleCommand command, CancellationToken cancellationToken)
            {
                var applicationRoleDTO = new ApplicationRoleDTO();
                applicationRoleDTO.RoleID = command.RoleID;
                applicationRoleDTO.RoleName = command.RoleName;
                applicationRoleDTO.ParentID = command.ParentID;
                applicationRoleDTO.CreatedDate = DateTime.Now;
                applicationRoleFacade.Update(applicationRoleDTO);
                return applicationRoleDTO.RoleID;
            }
        }
    }
}
