using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Commands
{
    public class DeleteApplicationSettingsByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteApplicationSettingsByIDCommandHandler : IRequestHandler<DeleteApplicationSettingsByIDCommand, int>
        {
            private readonly IApplicationSettingsFacade applicationSettingsFacade;

            public DeleteApplicationSettingsByIDCommandHandler(IApplicationSettingsFacade applicationSettingsFacade)
            {
                this.applicationSettingsFacade = applicationSettingsFacade;
            }
            public Task<int> Handle(DeleteApplicationSettingsByIDCommand command, CancellationToken cancellationToken)
            {
                var applicationRole = applicationSettingsFacade.GetById(command.Id);
                applicationSettingsFacade.Remove(applicationRole);
                return Task.FromResult(command.Id);
            }
        }
    }
}
