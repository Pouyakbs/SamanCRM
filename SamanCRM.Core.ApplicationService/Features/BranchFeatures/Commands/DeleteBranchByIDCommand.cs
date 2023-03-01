using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BranchFeatures.Commands
{
    public class DeleteBranchByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteBranchByIDCommandHandler : IRequestHandler<DeleteBranchByIDCommand, int>
        {
            private readonly IBranchFacade branchFacade;

            public DeleteBranchByIDCommandHandler(IBranchFacade branchFacade)
            {
                this.branchFacade = branchFacade;
            }
            public Task<int> Handle(DeleteBranchByIDCommand command, CancellationToken cancellationToken)
            {
                var branch = branchFacade.GetById(command.Id);
                branchFacade.Remove(branch);
                return Task.FromResult(command.Id);
            }
        }
    }
}
