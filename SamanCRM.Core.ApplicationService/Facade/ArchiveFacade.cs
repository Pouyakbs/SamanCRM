using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ArchiveFacade : IArchiveFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ArchiveFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ArchiveDTO entity)
        {
            Archive archiveDTO = mapper.Map<ArchiveDTO, Archive>(entity);
            unitofWork.Archive.Add(archiveDTO);
            unitofWork.Save();
            return archiveDTO.RecordID;
        }

        public IEnumerable<ArchiveDTO> GetAll()
        {
            IEnumerable<Archive> archive = unitofWork.Archive.GetAll();
            IEnumerable<ArchiveDTO> archiveDTO = mapper.Map<IEnumerable<Archive>, IEnumerable<ArchiveDTO>>(archive);
            return archiveDTO;
        }

        public ArchiveDTO GetById(int id)
        {
            Archive archive = unitofWork.Archive.GetById(id);
            ArchiveDTO archiveDTO = mapper.Map<Archive, ArchiveDTO>(archive);
            return archiveDTO;
        }

        public void Remove(ArchiveDTO entity)
        {
            Archive archiveDTO = mapper.Map<ArchiveDTO, Archive>(entity);
            unitofWork.Archive.Remove(archiveDTO);
            unitofWork.Save();
        }

        public void Update(ArchiveDTO entity)
        {
            Archive archiveDTO = mapper.Map<ArchiveDTO, Archive>(entity);
            ArchiveDTO archive = GetById(archiveDTO.RecordID);
            archiveDTO.CreatedDate = archive.CreatedDate;
            unitofWork.Archive.Update(archiveDTO);
            unitofWork.Save();
        }
    }
}
