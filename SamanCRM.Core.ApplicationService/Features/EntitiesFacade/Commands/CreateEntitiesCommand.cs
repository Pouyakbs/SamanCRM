using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Commands
{
    public class CreateEntitiesCommand : IRequest<int>
    {
        public string SystemName { get; set; }
        public string DisplayName { get; set; }
        public DateTime CreatedDate { get; set; }
        public class CreateEntitiesCommandHandler : IRequestHandler<CreateEntitiesCommand, int>
        {
            private readonly IEntitiesFacade entitiesFacade;

            public CreateEntitiesCommandHandler(IEntitiesFacade entitiesFacade)
            {
                this.entitiesFacade = entitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateEntitiesCommand command, CancellationToken cancellationToken)
            {
                var entitiesDTO = new EntitiesDTO();
                entitiesDTO.SystemName = command.SystemName;
                entitiesDTO.DisplayName = command.DisplayName;
                entitiesDTO.CreatedDate = DateTime.Now;
                entitiesFacade.Add(entitiesDTO);
                return entitiesDTO.EntitiesID;
            }
        }
    }
}
