using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ComPublicFacade : IComPublicFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ComPublicFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ComPublicDTO entity)
        {
            ComPublic comPublicDTO = mapper.Map<ComPublicDTO, ComPublic>(entity);
            unitofWork.ComPublics.Add(comPublicDTO);
            unitofWork.Save();
            return comPublicDTO.ComPublicID;
        }

        public IEnumerable<ComPublicDTO> GetAll()
        {
            IEnumerable<ComPublic> comPublic = unitofWork.ComPublics.GetAll();
            IEnumerable<ComPublicDTO> comPublicDTO = mapper.Map<IEnumerable<ComPublic>, IEnumerable<ComPublicDTO>>(comPublic);
            return comPublicDTO;
        }

        public ComPublicDTO GetById(int id)
        {
            ComPublic comPublic = unitofWork.ComPublics.GetById(id);
            ComPublicDTO comPublicDTO = mapper.Map<ComPublic, ComPublicDTO>(comPublic);
            return comPublicDTO;
        }

        public List<ComPublicDTO> GetByProgramPartId(int id)
        {
            List<ComPublic> comPublic = unitofWork.ComPublics.GetComPublicByProgramPartID(id);
            List<ComPublicDTO> comPublicDTO = mapper.Map<List<ComPublic>, List<ComPublicDTO>>(comPublic);
            return comPublicDTO;
        }

        public void Remove(ComPublicDTO entity)
        {
            ComPublic comPublicDTO = mapper.Map<ComPublicDTO, ComPublic>(entity);
            unitofWork.ComPublics.Remove(comPublicDTO);
            unitofWork.Save();
        }

        public void Update(ComPublicDTO entity)
        {
            ComPublic comPublicDTO = mapper.Map<ComPublicDTO, ComPublic>(entity);
            ComPublicDTO comPublic = GetById(comPublicDTO.ComPublicID);
            comPublicDTO.CreatedDate = comPublic.CreatedDate;
            unitofWork.ComPublics.Update(comPublicDTO);
            unitofWork.Save();
        }
    }
}
