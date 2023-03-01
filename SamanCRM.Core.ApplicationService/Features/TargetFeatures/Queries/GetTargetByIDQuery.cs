using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.TargetFeatures.Queries
{
    public class GetTargetByIdQuery : IRequest<TargetDTO>
    {
        public int Id { get; set; }
        public class GetTargetByIdQueryHandler : IRequestHandler<GetTargetByIdQuery, TargetDTO>
        {
            private readonly ITargetFacade targetFacade;

            public GetTargetByIdQueryHandler(ITargetFacade targetFacade)
            {
                this.targetFacade = targetFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<TargetDTO> Handle(GetTargetByIdQuery query, CancellationToken cancellationToken)
            {
                var target = targetFacade.GetById(query.Id);
                if (target == null) return null;
                return target;
            }
        }
    }
}
