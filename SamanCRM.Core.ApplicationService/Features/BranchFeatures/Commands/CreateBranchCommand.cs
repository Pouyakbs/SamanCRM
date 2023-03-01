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
    public class CreateBranchCommand : IRequest<int>
    {
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public string BranchPhoneNum { get; set; }
        public int CompanyID { get; set; }
        public class CreateBranchCommandHandler : IRequestHandler<CreateBranchCommand, int>
        {
            private readonly IBranchFacade branchFacade;

            public CreateBranchCommandHandler(IBranchFacade branchFacade)
            {
                this.branchFacade = branchFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateBranchCommand command, CancellationToken cancellationToken)
            {
                var branchDTO = new BranchDTO();
                branchDTO.BranchAddress = command.BranchAddress;
                branchDTO.BranchName = command.BranchName;
                branchDTO.BranchPhoneNum = command.BranchPhoneNum;
                branchDTO.CreatedDate = DateTime.Now;
                branchFacade.Add(branchDTO);
                return branchDTO.BranchID;
            }
        }
    }
}
