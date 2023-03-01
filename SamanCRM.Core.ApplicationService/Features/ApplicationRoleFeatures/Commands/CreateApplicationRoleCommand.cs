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
    public class CreateApplicationRoleCommand : IRequest<int>
    {
        public string RoleName { get; set; }
        public int ParentID { get; set; }
        public int BranchID { get; set; }
        public class CreateApplicationRoleCommandHandler : IRequestHandler<CreateApplicationRoleCommand, int>
        {
            private readonly IApplicationRoleFacade applicationRoleFacade;

            public CreateApplicationRoleCommandHandler(IApplicationRoleFacade applicationRoleFacade)
            {
                this.applicationRoleFacade = applicationRoleFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateApplicationRoleCommand command, CancellationToken cancellationToken)
            {
                var applicationRoleDTO = new ApplicationRoleDTO();
                applicationRoleDTO.RoleName = command.RoleName;
                applicationRoleDTO.ParentID = command.ParentID;
                applicationRoleDTO.BranchID = command.BranchID;
                applicationRoleDTO.CreatedDate = DateTime.Now;
                applicationRoleFacade.Add(applicationRoleDTO);
                return applicationRoleDTO.RoleID;
            }
        }
    }
}
