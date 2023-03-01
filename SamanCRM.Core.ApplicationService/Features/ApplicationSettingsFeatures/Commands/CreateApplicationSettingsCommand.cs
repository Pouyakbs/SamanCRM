using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Commands
{
    public class CreateApplicationSettingsCommand : IRequest<int>
    {
        public List<ApplicationSettingsDTO> ApplicationSettingsDTO { get; set; }
        public class CreateApplicationSettingsCommandHandler : IRequestHandler<CreateApplicationSettingsCommand , int>
        {
            private readonly IApplicationSettingsFacade applicationSettingsFacade;

            public CreateApplicationSettingsCommandHandler(IApplicationSettingsFacade applicationSettingsFacade)
            {
                this.applicationSettingsFacade = applicationSettingsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateApplicationSettingsCommand command, CancellationToken cancellationToken)
            {
                var applicationSettingsDTO = new List<ApplicationSettingsDTO>();
                applicationSettingsFacade.Add(applicationSettingsDTO);
                return applicationSettingsDTO.Count;
            }
        }
    }
}
