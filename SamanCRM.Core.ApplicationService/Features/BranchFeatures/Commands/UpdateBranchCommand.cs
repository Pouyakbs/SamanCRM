using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BranchFeatures.Commands
{
    public class UpdateBranchCommand : IRequest<int>
    {
        public int BranchID { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string BranchPhoneNum { get; set; }
        public class UpdateBranchCommandHandler : IRequestHandler<UpdateBranchCommand, int>
        {
            private readonly IBranchFacade branchFacade;

            public UpdateBranchCommandHandler(IBranchFacade branchFacade)
            {
                this.branchFacade = branchFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public Task<int> Handle(UpdateBranchCommand command, CancellationToken cancellationToken)
            {
                var branchDTO = new BranchDTO();
                branchDTO.BranchID = command.BranchID;
                branchDTO.BranchAddress = command.BranchAddress;
                branchDTO.BranchName = command.BranchName;
                branchDTO.BranchPhoneNum = command.BranchPhoneNum;
                branchFacade.Update(branchDTO);
                return Task.FromResult(command.BranchID);
            }
        }
    }
}
