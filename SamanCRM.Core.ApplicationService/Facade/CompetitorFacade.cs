using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class CompetitorFacade : ICompetitorFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public CompetitorFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(CompetitorDTO entity)
        {
            Competitor competitorDTO = mapper.Map<CompetitorDTO, Competitor>(entity);
            List<Archive> archive = new List<Archive>();
            unitofWork.Competitor.Add(competitorDTO);
            unitofWork.Save();
            // Add Files To Archive
            foreach (var item in entity.CompetitorFile)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = competitorDTO.CompetitorID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "Competitor" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.AddRange(archive);
            unitofWork.Save();
            return competitorDTO.CompetitorID;
        }

        public IEnumerable<CompetitorDTO> GetAll()
        {
            IEnumerable<Competitor> competitor = unitofWork.Competitor.GetAll();
            IEnumerable<CompetitorDTO> competitorDTO = mapper.Map<IEnumerable<Competitor>, IEnumerable<CompetitorDTO>>(competitor);
            return competitorDTO;
        }

        public CompetitorDTO GetById(int id)
        {
            Competitor competitor = unitofWork.Competitor.GetById(id);
            List<Archive> archive = unitofWork.Archive.GetArchiveByRecordID(id);
            List<string> files = new List<string>();
            // Get Related Files From Archive
            foreach (var item in archive)
            {
                if (item.EntityType == "Competitor")
                {
                    string rawPic = Convert.ToBase64String(item.File);
                    string file = "FileName:" + item.FileName + ",data:" + item.FileFormat + ";base64," + rawPic;
                    if (item.EntityType == "Competitor")
                    {
                        files.Add(file);
                    }
                }
            }
            CompetitorDTO competitorDTO = mapper.Map<Competitor, CompetitorDTO>(competitor);
            competitorDTO.CompetitorFile = files;
            return competitorDTO;
        }

        public void Remove(CompetitorDTO entity)
        {
            Competitor competitorDTO = mapper.Map<CompetitorDTO, Competitor>(entity);
            unitofWork.Competitor.Remove(competitorDTO);
            unitofWork.Save();
        }

        public void Update(CompetitorDTO entity)
        {
            Competitor competitorDTO = mapper.Map<CompetitorDTO, Competitor>(entity);
            List<Archive> archive = new List<Archive>();
            CompetitorDTO competitor = GetById(competitorDTO.CompetitorID);
            competitorDTO.CreatedDate = competitor.CreatedDate;
            competitorDTO.CompetitorGuid = Guid.NewGuid();
            unitofWork.Competitor.Update(competitorDTO);
            unitofWork.Save();
            // Update Files
            foreach (var item in entity.CompetitorFile)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = competitorDTO.CompetitorID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "Competitor" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.UpdateRange(archive);
            unitofWork.Save();
        }
    }
}
