using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ServiceFeatures.Commands
{

    public class CreateServiceCommand : IRequest<int>
    {
        public string Name { get; set; }
        public int Limitation { get; set; }
        public double Price { get; set; }
        public string MoneyUnit { get; set; }
        public string ServiceUnit { get; set; }
        public string Desc { get; set; }
        public class CreateServiceCommandHandler : IRequestHandler<CreateServiceCommand, int>
        {
            private readonly IServiceFacade serviceFacade;

            public CreateServiceCommandHandler(IServiceFacade serviceFacade)
            {
                this.serviceFacade = serviceFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateServiceCommand command, CancellationToken cancellationToken)
            {
                var serviceDTO = new ServiceDTO();
                serviceDTO.Name = command.Name;
                serviceDTO.Limitation = command.Limitation;
                serviceDTO.Price = command.Price;
                serviceDTO.MoneyUnit = command.MoneyUnit;
                serviceDTO.ServiceUnit = command.ServiceUnit;
                serviceDTO.Desc = command.Desc;
                serviceDTO.CreatedDate = DateTime.Now;
                serviceDTO.ServiceGuid = Guid.NewGuid();
                serviceFacade.Add(serviceDTO);
                return serviceDTO.ServiceID;
            }
        }
    }
}
