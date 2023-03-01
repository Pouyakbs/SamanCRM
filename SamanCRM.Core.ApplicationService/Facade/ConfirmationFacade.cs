using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ConfirmationFacade : IConfirmationFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ConfirmationFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ConfirmationDTO entity)
        {
            Confirmation confirmationDTO = mapper.Map<ConfirmationDTO, Confirmation>(entity);
            unitofWork.Confirmation.Add(confirmationDTO);
            unitofWork.Save();
            return confirmationDTO.ConfirmationID;
        }

        public IEnumerable<ConfirmationDTO> GetAll()
        {
            IEnumerable<Confirmation> confirmation = unitofWork.Confirmation.GetAll();
            IEnumerable<ConfirmationDTO> confirmationDTO = mapper.Map<IEnumerable<Confirmation>, IEnumerable<ConfirmationDTO>>(confirmation);
            return confirmationDTO;
        }

        public ConfirmationDTO GetById(int id)
        {
            Confirmation confirmation = unitofWork.Confirmation.GetById(id);
            ConfirmationDTO confirmationDTO = mapper.Map<Confirmation, ConfirmationDTO>(confirmation);
            return confirmationDTO;
        }

        public void Remove(ConfirmationDTO entity)
        {
            Confirmation confirmationDTO = mapper.Map<ConfirmationDTO, Confirmation>(entity);
            unitofWork.Confirmation.Remove(confirmationDTO);
            unitofWork.Save();
        }

        public void Update(ConfirmationDTO entity)
        {
            Confirmation confirmationDTO = mapper.Map<ConfirmationDTO, Confirmation>(entity);
            ConfirmationDTO confirmation = GetById(confirmationDTO.ConfirmationID);
            confirmationDTO.CreatedDate = confirmation.CreatedDate;
            unitofWork.Confirmation.Update(confirmationDTO);
            unitofWork.Save();
        }
    }
}
