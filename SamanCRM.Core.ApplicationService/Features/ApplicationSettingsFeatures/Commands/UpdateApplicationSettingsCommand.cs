using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Commands
{
    public class UpdateApplicationSettingsCommand : IRequest<int>
    {
        public int SettingID { get; set; }
        public string VariableName { get; set; }
        public string Value { get; set; }
        public int PersonnelID { get; set; }
        public class UpdateApplicationSettingsCommandHandler : IRequestHandler<UpdateApplicationSettingsCommand, int>
        {
            private readonly IApplicationSettingsFacade applicationSettingsFacade;

            public UpdateApplicationSettingsCommandHandler(IApplicationSettingsFacade applicationSettingsFacade)
            {
                this.applicationSettingsFacade = applicationSettingsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateApplicationSettingsCommand command, CancellationToken cancellationToken)
            {
                var applicationSettingsDTO = new ApplicationSettingsDTO();
                applicationSettingsDTO.SettingID = command.SettingID;
                applicationSettingsDTO.VariableName = command.VariableName;
                applicationSettingsDTO.Value = command.Value;
                applicationSettingsDTO.PersonnelID = command.PersonnelID;
                applicationSettingsFacade.Update(applicationSettingsDTO);
                return applicationSettingsDTO.SettingID;
            }
        }
    }
}
