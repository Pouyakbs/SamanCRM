using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.BranchFeatures.Queries
{
    public class GetBranchByIdQuery : IRequest<BranchDTO>
    {
        public int Id { get; set; }
        public class GetBranchByIdQueryHandler : IRequestHandler<GetBranchByIdQuery, BranchDTO>
        {
            private readonly IBranchFacade branchFacade;

            public GetBranchByIdQueryHandler(IBranchFacade branchFacade)
            {
                this.branchFacade = branchFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<BranchDTO> Handle(GetBranchByIdQuery query, CancellationToken cancellationToken)
            {
                var branch = branchFacade.GetById(query.Id);
                if (branch == null) return null;
                return branch;
            }
        }
    }
}
