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

    public class UpdateComPublicTitlesCommand : IRequest<int>
    {
        public int TitleID { get; set; }
        public string Title { get; set; }
        public int ProgramPartID { get; set; }
        public class UpdateComPublicTitlesCommandHandler : IRequestHandler<UpdateComPublicTitlesCommand, int>
        {
            private readonly IComPublicTitlesFacade comPublicTitlesFacade;

            public UpdateComPublicTitlesCommandHandler(IComPublicTitlesFacade comPublicTitlesFacade)
            {
                this.comPublicTitlesFacade = comPublicTitlesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateComPublicTitlesCommand command, CancellationToken cancellationToken)
            {
                var comPublicTitlesDTO = new ComPublicTitlesDTO();
                comPublicTitlesDTO.TitleID = command.TitleID;
                comPublicTitlesDTO.Title = command.Title;
                comPublicTitlesDTO.ProgramPartID = command.ProgramPartID;
                comPublicTitlesDTO.CreatedDate = DateTime.Now;
                comPublicTitlesFacade.Update(comPublicTitlesDTO);
                return comPublicTitlesDTO.TitleID;
            }
        }
    }
}
