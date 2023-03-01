using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class PasswordComplexityFacade : IPasswordComplexityFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public PasswordComplexityFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(PasswordComplexityDTO entity)
        {
            PasswordComplexity passwordComplexityDTO = mapper.Map<PasswordComplexityDTO, PasswordComplexity>(entity);
            unitofWork.PasswordComplexity.Add(passwordComplexityDTO);
            unitofWork.Save();
            return passwordComplexityDTO.PasswordComplexityID;
        }

        public IEnumerable<PasswordComplexityDTO> GetAll()
        {
            IEnumerable<PasswordComplexity> passwordComplexity = unitofWork.PasswordComplexity.GetAll();
            IEnumerable<PasswordComplexityDTO> passwordComplexityDTO = mapper.Map<IEnumerable<PasswordComplexity>, IEnumerable<PasswordComplexityDTO>>(passwordComplexity);
            return passwordComplexityDTO;
        }

        public PasswordComplexityDTO GetById(int id)
        {
            PasswordComplexity passwordComplexity = unitofWork.PasswordComplexity.GetById(id);
            PasswordComplexityDTO passwordComplexityDTO = mapper.Map<PasswordComplexity, PasswordComplexityDTO>(passwordComplexity);
            return passwordComplexityDTO;
        }

        public void Remove(PasswordComplexityDTO entity)
        {
            PasswordComplexity passwordComplexityDTO = mapper.Map<PasswordComplexityDTO, PasswordComplexity>(entity);
            unitofWork.PasswordComplexity.Remove(passwordComplexityDTO);
            unitofWork.Save();
        }

        public void Update(PasswordComplexityDTO entity)
        {
            PasswordComplexity passwordComplexityDTO = mapper.Map<PasswordComplexityDTO, PasswordComplexity>(entity);
            PasswordComplexityDTO passwordComplexity = GetById(passwordComplexityDTO.PasswordComplexityID);
            passwordComplexityDTO.CreatedDate = passwordComplexity.CreatedDate;
            unitofWork.PasswordComplexity.Update(passwordComplexityDTO);
            unitofWork.Save();
        }
    }

}
