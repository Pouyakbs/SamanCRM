using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ReportFacade : IReportFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ReportFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ReportDTO entity)
        {
            Report reportDTO = mapper.Map<ReportDTO, Report>(entity);
            unitofWork.Report.Add(reportDTO);
            unitofWork.Save();
            return reportDTO.ReportID;
        }

        public IEnumerable<ReportDTO> GetAll()
        {
            IEnumerable<Report> report = unitofWork.Report.GetAll();
            IEnumerable<ReportDTO> reportDTO = mapper.Map<IEnumerable<Report>, IEnumerable<ReportDTO>>(report);
            return reportDTO;
        }

        public ReportDTO GetById(int id)
        {
            Report report = unitofWork.Report.GetById(id);
            ReportDTO reportDTO = mapper.Map<Report, ReportDTO>(report);
            return reportDTO;
        }

        public void Remove(ReportDTO entity)
        {
            Report reportDTO = mapper.Map<ReportDTO, Report>(entity);
            unitofWork.Report.Remove(reportDTO);
            unitofWork.Save();
        }

        public void Update(ReportDTO entity)
        {
            Report reportDTO = mapper.Map<ReportDTO, Report>(entity);
            ReportDTO report = GetById(reportDTO.ReportID);
            reportDTO.CreatedDate = report.CreatedDate;
            unitofWork.Report.Update(reportDTO);
            unitofWork.Save();
        }
    }
}
