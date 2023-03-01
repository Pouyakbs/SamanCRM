using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ComPublicTitlesFacade : IComPublicTitlesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ComPublicTitlesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ComPublicTitlesDTO entity)
        {
            ComPublicTitles comPublicTitlesDTO = mapper.Map<ComPublicTitlesDTO, ComPublicTitles>(entity);
            unitofWork.ComPublicTitles.Add(comPublicTitlesDTO);
            unitofWork.Save();
            return comPublicTitlesDTO.TitleID;
        }

        public IEnumerable<ComPublicTitlesDTO> GetAll()
        {
            IEnumerable<ComPublicTitles> comPublicTitles = unitofWork.ComPublicTitles.GetAll();
            IEnumerable<ComPublicTitlesDTO> comPublicTitlesDTO = mapper.Map<IEnumerable<ComPublicTitles>, IEnumerable<ComPublicTitlesDTO>>(comPublicTitles);
            return comPublicTitlesDTO;
        }

        public ComPublicTitlesDTO GetById(int id)
        {
            ComPublicTitles comPublicTitles = unitofWork.ComPublicTitles.GetById(id);
            ComPublicTitlesDTO comPublicTitlesDTO = mapper.Map<ComPublicTitles, ComPublicTitlesDTO>(comPublicTitles);
            return comPublicTitlesDTO;
        }

        public void Remove(ComPublicTitlesDTO entity)
        {
            ComPublicTitles comPublicTitlesDTO = mapper.Map<ComPublicTitlesDTO, ComPublicTitles>(entity);
            unitofWork.ComPublicTitles.Remove(comPublicTitlesDTO);
            unitofWork.Save();
        }

        public void Update(ComPublicTitlesDTO entity)
        {
            ComPublicTitles comPublicTitlesDTO = mapper.Map<ComPublicTitlesDTO, ComPublicTitles>(entity);
            ComPublicTitlesDTO comPublicTitles = GetById(comPublicTitlesDTO.TitleID);
            comPublicTitlesDTO.CreatedDate = comPublicTitles.CreatedDate;
            unitofWork.ComPublicTitles.Update(comPublicTitlesDTO);
            unitofWork.Save();
        }
    }
}
