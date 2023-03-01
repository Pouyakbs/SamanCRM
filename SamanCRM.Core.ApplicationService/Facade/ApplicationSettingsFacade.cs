using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ApplicationSettingsFacade : IApplicationSettingsFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ApplicationSettingsFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(List<ApplicationSettingsDTO> entity)
        {
            List<ApplicationSettings> applicationSettingsDTO = mapper.Map<List<ApplicationSettingsDTO>, List<ApplicationSettings>>(entity);
            unitofWork.ApplicationSettings.AddRange(applicationSettingsDTO);
            foreach (var item in applicationSettingsDTO)
            {
                item.CreatedDate = System.DateTime.Now;
            }
            unitofWork.Save();
            return applicationSettingsDTO.Count;
        }

        public IEnumerable<ApplicationSettingsDTO> GetAll()
        {
            IEnumerable<ApplicationSettings> applicationSettings = unitofWork.ApplicationSettings.GetAll();
            IEnumerable<ApplicationSettingsDTO> applicationSettingsDTO = mapper.Map<IEnumerable<ApplicationSettings>, IEnumerable<ApplicationSettingsDTO>>(applicationSettings);
            return applicationSettingsDTO;
        }

        public ApplicationSettingsDTO GetById(int id)
        {
            ApplicationSettings applicationSettings = unitofWork.ApplicationSettings.GetById(id);
            ApplicationSettingsDTO applicationSettingsDTO = mapper.Map<ApplicationSettings, ApplicationSettingsDTO>(applicationSettings);
            return applicationSettingsDTO;
        }

        public void Remove(ApplicationSettingsDTO entity)
        {
            ApplicationSettings applicationSettingsDTO = mapper.Map<ApplicationSettingsDTO, ApplicationSettings>(entity);
            unitofWork.ApplicationSettings.Remove(applicationSettingsDTO);
            unitofWork.Save();
        }

        public void Update(ApplicationSettingsDTO entity)
        {
            ApplicationSettings applicationSettingsDTO = mapper.Map<ApplicationSettingsDTO, ApplicationSettings>(entity);
            ApplicationSettingsDTO applicationSettings = GetById(applicationSettingsDTO.SettingID);
            applicationSettingsDTO.CreatedDate = applicationSettings.CreatedDate;
            unitofWork.ApplicationSettings.Update(applicationSettingsDTO);
            unitofWork.Save();
        }
    }
}
