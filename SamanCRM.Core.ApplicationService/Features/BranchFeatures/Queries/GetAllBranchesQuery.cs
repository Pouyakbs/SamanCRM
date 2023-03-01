using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BranchFeatures.Queries
{
    public class GetAllBranchesQuery : IRequest<IEnumerable<BranchDTO>>
    {
        public class GetAllBranchesQueryHandler : IRequestHandler<GetAllBranchesQuery, IEnumerable<BranchDTO>>
        {
            private readonly IBranchFacade branchFacade;

            public GetAllBranchesQueryHandler(IBranchFacade branchFacade)
            {
                this.branchFacade = branchFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<BranchDTO>> Handle(GetAllBranchesQuery query, CancellationToken cancellationToken)
            {
                var branchesList = branchFacade.GetAll().ToList();
                if (branchesList == null)
                {
                    return null;
                }
                return branchesList.AsReadOnly();
            }
        }
    }
}
