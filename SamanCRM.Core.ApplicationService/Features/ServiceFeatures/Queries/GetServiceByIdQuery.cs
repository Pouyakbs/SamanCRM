using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServiceFeatures.Queries
{
    public class GetServiceByIdQuery : IRequest<ServiceDTO>
    {
        public int Id { get; set; }
        public class GetServiceByIdQueryHandler : IRequestHandler<GetServiceByIdQuery, ServiceDTO>
        {
            private readonly IServiceFacade serviceFacade;

            public GetServiceByIdQueryHandler(IServiceFacade serviceFacade)
            {
                this.serviceFacade = serviceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ServiceDTO> Handle(GetServiceByIdQuery query, CancellationToken cancellationToken)
            {
                var service = serviceFacade.GetById(query.Id);
                if (service == null) return null;
                return service;
            }
        }
    }
}
