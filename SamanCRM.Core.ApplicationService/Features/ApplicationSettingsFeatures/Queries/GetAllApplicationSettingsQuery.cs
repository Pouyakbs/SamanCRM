using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationSettingsFeatures.Queries
{

    public class GetAllApplicationSettingsQuery : IRequest<IEnumerable<ApplicationSettingsDTO>>
    {
        public class GetAllApplicationSettingsQueryHandler : IRequestHandler<GetAllApplicationSettingsQuery, IEnumerable<ApplicationSettingsDTO>>
        {
            private readonly IApplicationSettingsFacade applicationSettingsFacade;

            public GetAllApplicationSettingsQueryHandler(IApplicationSettingsFacade applicationSettingsFacade)
            {
                this.applicationSettingsFacade = applicationSettingsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ApplicationSettingsDTO>> Handle(GetAllApplicationSettingsQuery query, CancellationToken cancellationToken)
            {
                var applicationSettingsList = applicationSettingsFacade.GetAll().ToList();
                if (applicationSettingsList == null)
                {
                    return null;
                }
                return applicationSettingsList.AsReadOnly();
            }
        }
    }
}
