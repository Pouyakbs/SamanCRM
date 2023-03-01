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
    public class UpdateConfirmationCommand : IRequest<int>
    {
        public int ConfirmationID { get; set; }
        public string Name { get; set; }
        public string ParentName { get; set; }
        public string ApprovalModel { get; set; }
        public string Status { get; set; }
        public string ApprovalType { get; set; }
        public string ConfirmLevel { get; set; }
        public string Seconder { get; set; }
        public string Desc { get; set; }
        public class UpdateConfirmationCommandHandler : IRequestHandler<UpdateConfirmationCommand, int>
        {
            private readonly IConfirmationFacade confirmationFacade;

            public UpdateConfirmationCommandHandler(IConfirmationFacade confirmationFacade)
            {
                this.confirmationFacade = confirmationFacade;
            }
            public Task<int> Handle(UpdateConfirmationCommand command, CancellationToken cancellationToken)
            {
                var confirmationDTO = new ConfirmationDTO();
                confirmationDTO.ConfirmationID = command.ConfirmationID;
                confirmationDTO.ApprovalModel = command.ApprovalModel;
                confirmationDTO.ApprovalType = command.ApprovalType;
                confirmationDTO.ConfirmLevel = command.ConfirmLevel;
                confirmationDTO.Desc = command.Desc;
                confirmationDTO.Name = command.Name;
                confirmationDTO.ParentName = command.ParentName;
                confirmationDTO.Seconder = command.Seconder;
                confirmationDTO.Status = command.Status;
                confirmationFacade.Update(confirmationDTO);
                return Task.FromResult(command.ConfirmationID);
            }
        }
    }
}
