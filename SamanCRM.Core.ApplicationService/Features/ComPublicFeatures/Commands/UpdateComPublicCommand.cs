using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Commands
{
    public class UpdateComPublicCommand : IRequest<int>
    {
        public int ComPublicID { get; set; }
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public int ComPublicTitleID { get; set; }
        public class UpdateComPublicCommandHandler : IRequestHandler<UpdateComPublicCommand, int>
        {
            private readonly IComPublicFacade comPublicFacade;

            public UpdateComPublicCommandHandler(IComPublicFacade comPublicFacade)
            {
                this.comPublicFacade = comPublicFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateComPublicCommand command, CancellationToken cancellationToken)
            {
                var comPublicDTO = new ComPublicDTO();
                comPublicDTO.ComPublicID = command.ComPublicID;
                comPublicDTO.Title = command.Title;
                comPublicDTO.ProgramPartID = command.ProgramPartID;
                comPublicDTO.ComPublicTitleID = command.ComPublicTitleID;
                comPublicFacade.Update(comPublicDTO);
                return comPublicDTO.ComPublicID;
            }
        }
    }
}
