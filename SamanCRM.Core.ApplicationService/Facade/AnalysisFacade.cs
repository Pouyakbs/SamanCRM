using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class AnalysisFacade : IAnalysisFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public AnalysisFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(AnalysisDTO entity)
        {
            Analysis analysisDTO = mapper.Map<AnalysisDTO, Analysis>(entity);
            unitofWork.Analysis.Add(analysisDTO);
            unitofWork.Save();
            return analysisDTO.AnalysisID;
        }

        public IEnumerable<AnalysisDTO> GetAll()
        {
            IEnumerable<Analysis> analysis = unitofWork.Analysis.GetAll();
            IEnumerable<AnalysisDTO> analysisDTO = mapper.Map<IEnumerable<Analysis>, IEnumerable<AnalysisDTO>>(analysis);
            return analysisDTO;
        }

        public AnalysisDTO GetById(int id)
        {
            Analysis analysis = unitofWork.Analysis.GetById(id);
            AnalysisDTO analysisDTO = mapper.Map<Analysis, AnalysisDTO>(analysis);
            return analysisDTO;
        }

        public void Remove(AnalysisDTO entity)
        {
            Analysis analysisDTO = mapper.Map<AnalysisDTO, Analysis>(entity);
            unitofWork.Analysis.Remove(analysisDTO);
            unitofWork.Save();
        }

        public void Update(AnalysisDTO entity)
        {
            Analysis analysisDTO = mapper.Map<AnalysisDTO, Analysis>(entity);
            AnalysisDTO analysis = GetById(analysisDTO.AnalysisID);
            analysisDTO.CreatedDate = analysis.CreatedDate;
            unitofWork.Analysis.Update(analysisDTO);
            unitofWork.Save();
        }
    }

}
