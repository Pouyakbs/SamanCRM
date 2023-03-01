using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class TargetFacade : ITargetFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public TargetFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(TargetDTO entity)
        {
            Target targetDTO = mapper.Map<TargetDTO, Target>(entity);
            unitofWork.Target.Add(targetDTO);
            unitofWork.Save();
            return targetDTO.TargetID;
        }

        public IEnumerable<TargetDTO> GetAll()
        {
            IEnumerable<Target> target = unitofWork.Target.GetAll();
            IEnumerable<TargetDTO> targetDTO = mapper.Map<IEnumerable<Target>, IEnumerable<TargetDTO>>(target);
            return targetDTO;
        }

        public TargetDTO GetById(int id)
        {
            Target target = unitofWork.Target.GetById(id);
            TargetDTO targetDTO = mapper.Map<Target, TargetDTO>(target);
            return targetDTO;
        }

        public void Remove(TargetDTO entity)
        {
            Target targetDTO = mapper.Map<TargetDTO, Target>(entity);
            unitofWork.Target.Remove(targetDTO);
            unitofWork.Save();
        }

        public void Update(TargetDTO entity)
        {
            Target targetDTO = mapper.Map<TargetDTO, Target>(entity);
            TargetDTO target = GetById(targetDTO.TargetID);
            targetDTO.CreatedDate = target.CreatedDate;
            unitofWork.Target.Update(targetDTO);
            unitofWork.Save();
        }
    }
}
