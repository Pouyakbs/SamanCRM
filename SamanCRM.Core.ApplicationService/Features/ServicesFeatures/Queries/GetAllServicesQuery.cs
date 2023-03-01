using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServicesFeatures.Queries
{
    public class GetAllServicesQuery : IRequest<IEnumerable<ServicesDTO>>
    {
        public class GetAllServicesQueryHandler : IRequestHandler<GetAllServicesQuery, IEnumerable<ServicesDTO>>
        {
            private readonly IServicesFacade servicesFacade;

            public GetAllServicesQueryHandler(IServicesFacade servicesFacade)
            {
                this.servicesFacade = servicesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ServicesDTO>> Handle(GetAllServicesQuery query, CancellationToken cancellationToken)
            {
                var serviceList = servicesFacade.GetAll().ToList();
                if (serviceList == null)
                {
                    return null;
                }
                return serviceList.AsReadOnly();
            }
        }
    }
}
