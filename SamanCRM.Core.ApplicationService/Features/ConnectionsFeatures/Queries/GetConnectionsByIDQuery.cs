using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConnectionsFeatures.Queries
{
    public class GetConnectionsByIdQuery : IRequest<ConnectionsDTO>
    {
        public int Id { get; set; }
        public class GetConnectionsByIdQueryHandler : IRequestHandler<GetConnectionsByIdQuery, ConnectionsDTO>
        {
            private readonly IConnectionsFacade connectionsFacade;

            public GetConnectionsByIdQueryHandler(IConnectionsFacade connectionsFacade)
            {
                this.connectionsFacade = connectionsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ConnectionsDTO> Handle(GetConnectionsByIdQuery query, CancellationToken cancellationToken)
            {
                var connections = connectionsFacade.GetById(query.Id);
                if (connections == null) return null;
                return connections;
            }
        }
    }
}
