using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServiceFeatures.Queries
{
    public class GetAllServicesQuery : IRequest<IEnumerable<ServiceDTO>>
    {
        public class GetAllServicesQueryHandler : IRequestHandler<GetAllServicesQuery, IEnumerable<ServiceDTO>>
        {
            private readonly IServiceFacade serviceFacade;

            public GetAllServicesQueryHandler(IServiceFacade serviceFacade)
            {
                this.serviceFacade = serviceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ServiceDTO>> Handle(GetAllServicesQuery query, CancellationToken cancellationToken)
            {
                var serviceList = serviceFacade.GetAll().ToList();
                if (serviceList == null)
                {
                    return null;
                }
                return serviceList.AsReadOnly();
            }
        }
    }
}
