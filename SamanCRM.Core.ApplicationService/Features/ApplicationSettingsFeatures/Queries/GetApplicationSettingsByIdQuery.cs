using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Queries
{
    public class GetApplicationSettingsByIdQuery : IRequest<ApplicationSettingsDTO>
    {
        public int Id { get; set; }
        public class GetApplicationSettingsByIdQueryHandler : IRequestHandler<GetApplicationSettingsByIdQuery, ApplicationSettingsDTO>
        {
            private readonly IApplicationSettingsFacade applicationSettingsFacade;

            public GetApplicationSettingsByIdQueryHandler(IApplicationSettingsFacade applicationSettingsFacade)
            {
                this.applicationSettingsFacade = applicationSettingsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ApplicationSettingsDTO> Handle(GetApplicationSettingsByIdQuery query, CancellationToken cancellationToken)
            {
                var applicationSettings = applicationSettingsFacade.GetById(query.Id);
                if (applicationSettings == null) return null;
                return applicationSettings;
            }
        }
    }
}
