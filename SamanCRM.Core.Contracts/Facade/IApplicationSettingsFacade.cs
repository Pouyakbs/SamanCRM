using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IApplicationSettingsFacade
    {
        ApplicationSettingsDTO GetById(int id);
        IEnumerable<ApplicationSettingsDTO> GetAll();
        int Add(List<ApplicationSettingsDTO> entity);
        void Remove(ApplicationSettingsDTO entity);
        void Update(ApplicationSettingsDTO entity);
    }
}
