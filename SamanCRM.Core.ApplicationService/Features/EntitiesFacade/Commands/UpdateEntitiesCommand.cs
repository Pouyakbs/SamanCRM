using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.EntitiesFacade.Commands
{
    public class UpdateEntitiesCommand : IRequest<int>
    {
        public int EntitiesID { get; set; }
        public string SystemName { get; set; }
        public string DisplayName { get; set; }
        public class UpdateEntitiesCommandHandler : IRequestHandler<UpdateEntitiesCommand, int>
        {
            private readonly IEntitiesFacade entitiesFacade;

            public UpdateEntitiesCommandHandler(IEntitiesFacade entitiesFacade)
            {
                this.entitiesFacade = entitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateEntitiesCommand command, CancellationToken cancellationToken)
            {
                var entitiesDTO = new EntitiesDTO();
                entitiesDTO.EntitiesID = command.EntitiesID;
                entitiesDTO.SystemName = command.SystemName;
                entitiesDTO.DisplayName = command.DisplayName;
                entitiesFacade.Update(entitiesDTO);
                return entitiesDTO.EntitiesID;
            }
        }
    }
}
