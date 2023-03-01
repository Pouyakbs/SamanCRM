using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicTitles.Commands
{
    public class CreateComPublicTitlesCommand : IRequest<int>
    {
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public class CreateComPublicTitlesCommandHandler : IRequestHandler<CreateComPublicTitlesCommand, int>
        {
            private readonly IComPublicTitlesFacade comPublicTitlesFacade;

            public CreateComPublicTitlesCommandHandler(IComPublicTitlesFacade comPublicTitlesFacade)
            {
                this.comPublicTitlesFacade = comPublicTitlesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateComPublicTitlesCommand command, CancellationToken cancellationToken)
            {
                var comPublicTitlesDTO = new ComPublicTitlesDTO();
                comPublicTitlesDTO.Title = command.Title;
                comPublicTitlesDTO.ProgramPartID = command.ProgramPartID;
                comPublicTitlesDTO.CreatedDate = DateTime.Now;
                comPublicTitlesFacade.Add(comPublicTitlesDTO);
                return comPublicTitlesDTO.TitleID;
            }
        }
    }
}
