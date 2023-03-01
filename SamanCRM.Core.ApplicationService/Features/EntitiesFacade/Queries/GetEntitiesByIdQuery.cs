using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Queries
{
    public class GetEntitiesByIdQuery : IRequest<EntitiesDTO>
    {
        public int Id { get; set; }
        public class GetEntitiesByIdQueryHandler : IRequestHandler<GetEntitiesByIdQuery, EntitiesDTO>
        {
            private readonly IEntitiesFacade entitiesFacade;

            public GetEntitiesByIdQueryHandler(IEntitiesFacade entitiesFacade)
            {
                this.entitiesFacade = entitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<EntitiesDTO> Handle(GetEntitiesByIdQuery query, CancellationToken cancellationToken)
            {
                var entities = entitiesFacade.GetById(query.Id);
                if (entities == null) return null;
                return entities;
            }
        }
    }
}
