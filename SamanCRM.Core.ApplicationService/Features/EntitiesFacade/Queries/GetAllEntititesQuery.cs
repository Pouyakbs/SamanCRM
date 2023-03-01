using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Queries
{

    public class GetAllEntitiesQuery : IRequest<IEnumerable<EntitiesDTO>>
    {
        public class GetAllEntitiesQueryHandler : IRequestHandler<GetAllEntitiesQuery, IEnumerable<EntitiesDTO>>
        {
            private readonly IEntitiesFacade entitiesFacade;

            public GetAllEntitiesQueryHandler(IEntitiesFacade entitiesFacade)
            {
                this.entitiesFacade = entitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<EntitiesDTO>> Handle(GetAllEntitiesQuery query, CancellationToken cancellationToken)
            {
                var entitiesList = entitiesFacade.GetAll().ToList();
                if (entitiesList == null)
                {
                    return null;
                }
                return entitiesList.AsReadOnly();
            }
        }
    }
}
