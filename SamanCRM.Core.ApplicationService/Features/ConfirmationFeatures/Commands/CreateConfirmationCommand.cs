using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConfirmationFeatures.Commands
{
    public class CreateConfirmationCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string ParentName { get; set; }
        public string ApprovalModel { get; set; }
        public string Status { get; set; }
        public string ApprovalType { get; set; }
        public string ConfirmLevel { get; set; }
        public string Seconder { get; set; }
        public string Desc { get; set; }
        public class CreateConfirmationCommandHandler : IRequestHandler<CreateConfirmationCommand, int>
        {
            private readonly IConfirmationFacade confirmationFacade;

            public CreateConfirmationCommandHandler(IConfirmationFacade confirmationFacade)
            {
                this.confirmationFacade = confirmationFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateConfirmationCommand command, CancellationToken cancellationToken)
            {
                var confirmationDTO = new ConfirmationDTO();
                confirmationDTO.ApprovalModel = command.ApprovalModel;
                confirmationDTO.ApprovalType = command.ApprovalType;
                confirmationDTO.ConfirmLevel = command.ConfirmLevel;
                confirmationDTO.Desc = command.Desc;
                confirmationDTO.Name = command.Name;
                confirmationDTO.ParentName = command.ParentName;
                confirmationDTO.Seconder = command.Seconder;
                confirmationDTO.Status = command.Status;
                confirmationDTO.CreatedDate = DateTime.Now;
                confirmationDTO.ConfirmationGuid = Guid.NewGuid();
                confirmationFacade.Add(confirmationDTO);
                return confirmationDTO.ConfirmationID;
            }
        }
    }
}
