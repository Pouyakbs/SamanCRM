using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ServiceFacade : IServiceFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ServiceFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ServiceDTO entity)
        {
            Service serviceDTO = mapper.Map<ServiceDTO, Service>(entity);
            unitofWork.Service.Add(serviceDTO);
            unitofWork.Save();
            return serviceDTO.ServiceID;
        }

        public IEnumerable<ServiceDTO> GetAll()
        {
            IEnumerable<Service> service = unitofWork.Service.GetAll();
            IEnumerable<ServiceDTO> serviceDTO = mapper.Map<IEnumerable<Service>, IEnumerable<ServiceDTO>>(service);
            return serviceDTO;
        }

        public ServiceDTO GetById(int id)
        {
            Service service = unitofWork.Service.GetById(id);
            ServiceDTO serviceDTO = mapper.Map<Service, ServiceDTO>(service);
            return serviceDTO;
        }

        public void Remove(ServiceDTO entity)
        {
            Service serviceDTO = mapper.Map<ServiceDTO, Service>(entity);
            unitofWork.Service.Remove(serviceDTO);
            unitofWork.Save();
        }

        public void Update(ServiceDTO entity)
        {
            Service serviceDTO = mapper.Map<ServiceDTO, Service>(entity);
            ServiceDTO service = GetById(serviceDTO.ServiceID);
            serviceDTO.CreatedDate = service.CreatedDate;
            unitofWork.Service.Update(serviceDTO);
            unitofWork.Save();
        }
    }
}
