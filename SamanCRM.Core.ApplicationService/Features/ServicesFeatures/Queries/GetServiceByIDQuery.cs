using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServicesFeatures.Queries
{
    public class GetServiceByIdQuery : IRequest<ServicesDTO>
    {
        public int Id { get; set; }
        public class GetServiceByIdQueryHandler : IRequestHandler<GetServiceByIdQuery, ServicesDTO>
        {
            private readonly IServicesFacade servicesFacade;

            public GetServiceByIdQueryHandler(IServicesFacade servicesFacade)
            {
                this.servicesFacade = servicesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ServicesDTO> Handle(GetServiceByIdQuery query, CancellationToken cancellationToken)
            {
                var service = servicesFacade.GetById(query.Id);
                if (service == null) return null;
                return service;
            }
        }
    }
}
