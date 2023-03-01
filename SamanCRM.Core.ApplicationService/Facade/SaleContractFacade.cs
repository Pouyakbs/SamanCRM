using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class SaleContractFacade : ISaleContractFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public SaleContractFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(SaleContractDTO entity)
        {
            SaleContract saleContractDTO = mapper.Map<SaleContractDTO, SaleContract>(entity);
            unitofWork.SaleContract.Add(saleContractDTO);
            unitofWork.Save();
            return saleContractDTO.ContractID;
        }

        public IEnumerable<SaleContractDTO> GetAll()
        {
            IEnumerable<SaleContract> saleContract = unitofWork.SaleContract.GetAll();
            IEnumerable<SaleContractDTO> saleContractDTO = mapper.Map<IEnumerable<SaleContract>, IEnumerable<SaleContractDTO>>(saleContract);
            return saleContractDTO;
        }

        public SaleContractDTO GetById(int id)
        {
            SaleContract saleContract = unitofWork.SaleContract.GetById(id);
            SaleContractDTO saleContractDTO = mapper.Map<SaleContract, SaleContractDTO>(saleContract);
            return saleContractDTO;
        }

        public void Remove(SaleContractDTO entity)
        {
            SaleContract saleContractDTO = mapper.Map<SaleContractDTO, SaleContract>(entity);
            unitofWork.SaleContract.Remove(saleContractDTO);
            unitofWork.Save();
        }

        public void Update(SaleContractDTO entity)
        {
            SaleContract saleContractDTO = mapper.Map<SaleContractDTO, SaleContract>(entity);
            SaleContractDTO saleContract = GetById(saleContractDTO.ContractID);
            saleContractDTO.CreatedDate = saleContract.CreatedDate;
            unitofWork.SaleContract.Update(saleContractDTO);
            unitofWork.Save();
        }
    }
}
