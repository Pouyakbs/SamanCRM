using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ServicesFacade : IServicesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ServicesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ServicesDTO entity)
        {
            Services servicesDTO = mapper.Map<ServicesDTO, Services>(entity);
            unitofWork.Services.Add(servicesDTO);
            unitofWork.Save();
            return servicesDTO.ServiceID;
        }

        public IEnumerable<ServicesDTO> GetAll()
        {
            IEnumerable<Services> services = unitofWork.Services.GetAll();
            IEnumerable<ServicesDTO> servicesDTO = mapper.Map<IEnumerable<Services>, IEnumerable<ServicesDTO>>(services);
            return servicesDTO;
        }

        public ServicesDTO GetById(int id)
        {
            Services services = unitofWork.Services.GetById(id);
            ServicesDTO servicesDTO = mapper.Map<Services, ServicesDTO>(services);
            return servicesDTO;
        }

        public void Remove(ServicesDTO entity)
        {
            Services servicesDTO = mapper.Map<ServicesDTO, Services>(entity);
            unitofWork.Services.Remove(servicesDTO);
            unitofWork.Save();
        }

        public void Update(ServicesDTO entity)
        {
            Services servicesDTO = mapper.Map<ServicesDTO, Services>(entity);
            ServicesDTO services = GetById(servicesDTO.ServiceID);
            servicesDTO.CreatedDate = services.CreatedDate;
            unitofWork.Services.Update(servicesDTO);
            unitofWork.Save();
        }
    }
}
