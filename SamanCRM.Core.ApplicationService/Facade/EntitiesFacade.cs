using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class EntitiesFacade : IEntitiesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public EntitiesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(EntitiesDTO entity)
        {
            Entities entitiesDTO = mapper.Map<EntitiesDTO, Entities>(entity);
            unitofWork.Entities.Add(entitiesDTO);
            unitofWork.Save();
            return entitiesDTO.EntitiesID;
        }

        public IEnumerable<EntitiesDTO> GetAll()
        {
            IEnumerable<Entities> entities = unitofWork.Entities.GetAll();
            IEnumerable<EntitiesDTO> entitiesDTO = mapper.Map<IEnumerable<Entities>, IEnumerable<EntitiesDTO>>(entities);
            return entitiesDTO;
        }

        public EntitiesDTO GetById(int id)
        {
            Entities entities = unitofWork.Entities.GetById(id);
            EntitiesDTO entitiesDTO = mapper.Map<Entities, EntitiesDTO>(entities);
            return entitiesDTO;
        }

        public void Remove(EntitiesDTO entity)
        {
            Entities entitiesDTO = mapper.Map<EntitiesDTO, Entities>(entity);
            unitofWork.Entities.Remove(entitiesDTO);
            unitofWork.Save();
        }

        public void Update(EntitiesDTO entity)
        {
            Entities entitiesDTO = mapper.Map<EntitiesDTO, Entities>(entity);
            EntitiesDTO entities = GetById(entitiesDTO.EntitiesID);
            entitiesDTO.CreatedDate = entities.CreatedDate;
            unitofWork.Entities.Update(entitiesDTO);
            unitofWork.Save();
        }
    }
}
