using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class CluesFacade : ICluesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public CluesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(CluesDTO entity)
        {
            Clues cluesDTO = mapper.Map<CluesDTO, Clues>(entity);
            unitofWork.Clues.Add(cluesDTO);
            unitofWork.Save();
            return cluesDTO.ClueID;
        }

        public IEnumerable<CluesDTO> GetAll()
        {
            IEnumerable<Clues> clues = unitofWork.Clues.GetAll();
            IEnumerable<CluesDTO> cluesDTO = mapper.Map<IEnumerable<Clues>, IEnumerable<CluesDTO>>(clues);
            return cluesDTO;
        }

        public CluesDTO GetById(int id)
        {
            Clues clues = unitofWork.Clues.GetById(id);
            CluesDTO cluesDTO = mapper.Map<Clues, CluesDTO>(clues);
            return cluesDTO;
        }

        public void Remove(CluesDTO entity)
        {
            Clues cluesDTO = mapper.Map<CluesDTO, Clues>(entity);
            unitofWork.Clues.Remove(cluesDTO);
            unitofWork.Save();
        }

        public void Update(CluesDTO entity)
        {
            Clues cluesDTO = mapper.Map<CluesDTO, Clues>(entity);
            CluesDTO clues = GetById(cluesDTO.ClueID);
            cluesDTO.CreatedDate = clues.CreatedDate;
            unitofWork.Clues.Update(cluesDTO);
            unitofWork.Save();
        }
    }
}
