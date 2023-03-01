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

    public class CreateComPublicCommand : IRequest<int>
    {
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public int ComPublicTitleID { get; set; }
        public class CreateComPublicCommandHandler : IRequestHandler<CreateComPublicCommand, int>
        {
            private readonly IComPublicFacade comPublicFacade;

            public CreateComPublicCommandHandler(IComPublicFacade comPublicFacade)
            {
                this.comPublicFacade = comPublicFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateComPublicCommand command, CancellationToken cancellationToken)
            {
                var comPublicDTO = new ComPublicDTO();
                comPublicDTO.Title = command.Title;
                comPublicDTO.ProgramPartID = command.ProgramPartID;
                comPublicDTO.ComPublicTitleID = command.ComPublicTitleID;
                comPublicDTO.CreatedDate = DateTime.Now;
                comPublicFacade.Add(comPublicDTO);
                return comPublicDTO.ComPublicID;
            }
        }
    }
}
