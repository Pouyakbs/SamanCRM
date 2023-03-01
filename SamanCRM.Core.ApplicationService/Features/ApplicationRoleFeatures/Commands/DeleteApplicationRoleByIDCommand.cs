using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationRoleFeatures.Commands
{
    public class DeleteApplicationRoleByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteApplicationRoleByIDCommandHandler : IRequestHandler<DeleteApplicationRoleByIDCommand, int>
        {
            private readonly IApplicationRoleFacade applicationRoleFacade;

            public DeleteApplicationRoleByIDCommandHandler(IApplicationRoleFacade applicationRoleFacade)
            {
                this.applicationRoleFacade = applicationRoleFacade;
            }
            public Task<int> Handle(DeleteApplicationRoleByIDCommand command, CancellationToken cancellationToken)
            {
                var applicationRole = applicationRoleFacade.GetById(command.Id);
                applicationRoleFacade.Remove(applicationRole);
                return Task.FromResult(command.Id);
            }
        }
    }
}
