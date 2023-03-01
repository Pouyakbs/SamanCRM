using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.TargetFeatures.Queries
{
    public class GetAllTargetsQuery : IRequest<IEnumerable<TargetDTO>>
    {
        public class GetAllTargetsQueryHandler : IRequestHandler<GetAllTargetsQuery, IEnumerable<TargetDTO>>
        {
            private readonly ITargetFacade targetFacade;

            public GetAllTargetsQueryHandler(ITargetFacade targetFacade)
            {
                this.targetFacade = targetFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<TargetDTO>> Handle(GetAllTargetsQuery query, CancellationToken cancellationToken)
            {
                var TargetList = targetFacade.GetAll().ToList();
                if (TargetList == null)
                {
                    return null;
                }
                return TargetList.AsReadOnly();
            }
        }
    }
}
