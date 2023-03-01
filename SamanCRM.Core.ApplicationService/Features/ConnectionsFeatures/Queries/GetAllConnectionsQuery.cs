using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConnectionsFeatures.Queries
{
    public class GetAllConnectionsQuery : IRequest<IEnumerable<ConnectionsDTO>>
    {
        public class GetAllConnectionsQueryHandler : IRequestHandler<GetAllConnectionsQuery, IEnumerable<ConnectionsDTO>>
        {
            private readonly IConnectionsFacade connectionsFacade;

            public GetAllConnectionsQueryHandler(IConnectionsFacade connectionsFacade)
            {
                this.connectionsFacade = connectionsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ConnectionsDTO>> Handle(GetAllConnectionsQuery query, CancellationToken cancellationToken)
            {
                var connectionsList = connectionsFacade.GetAll().ToList();
                if (connectionsList == null)
                {
                    return null;
                }
                return connectionsList.AsReadOnly();
            }
        }
    }
}
