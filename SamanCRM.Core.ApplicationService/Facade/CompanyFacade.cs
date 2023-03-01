using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class CompanyFacade : ICompanyFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public CompanyFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(CompanyDTO entity)
        {
            Company companyDTO = mapper.Map<CompanyDTO, Company>(entity);
            unitofWork.Company.Add(companyDTO);
            unitofWork.Save();
            return companyDTO.CompanyID;
        }

        public IEnumerable<CompanyDTO> GetAll()
        {
            IEnumerable<Company> Companies = unitofWork.Company.GetAll();
            IEnumerable<CompanyDTO> CompaniesDTO = mapper.Map<IEnumerable<Company>, IEnumerable<CompanyDTO>>(Companies);
            return CompaniesDTO;
        }

        public CompanyDTO GetById(int id)
        {
            Company company = unitofWork.Company.GetById(id);
            CompanyDTO companyDTO = mapper.Map<Company, CompanyDTO>(company);
            return companyDTO;
        }

        public void Remove(CompanyDTO entity)
        {
            Company companyDTO = mapper.Map<CompanyDTO, Company>(entity);
            unitofWork.Company.Remove(companyDTO);
            unitofWork.Save();
        }

        public void Update(CompanyDTO entity)
        {
            Company companyDTO = mapper.Map<CompanyDTO, Company>(entity);
            CompanyDTO company = GetById(companyDTO.CompanyID);
            companyDTO.CreatedDate = company.CreatedDate;
            unitofWork.Company.Update(companyDTO);
            unitofWork.Save();
        }
    }
}
