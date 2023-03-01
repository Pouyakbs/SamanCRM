using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class BranchFacade : IBranchFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public BranchFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(BranchDTO entity)
        {
            Branch branchDTO = mapper.Map<BranchDTO, Branch>(entity);
            unitofWork.Branch.Add(branchDTO);
            unitofWork.Save();
            return branchDTO.BranchID;
        }

        public IEnumerable<BranchDTO> GetAll()
        {
            IEnumerable<Branch> branches = unitofWork.Branch.GetAll();
            IEnumerable<BranchDTO> branchesDTO = mapper.Map<IEnumerable<Branch>, IEnumerable<BranchDTO>>(branches);
            return branchesDTO;
        }

        public BranchDTO GetById(int id)
        {
            Branch branch = unitofWork.Branch.GetById(id);
            BranchDTO branchDTO = mapper.Map<Branch, BranchDTO>(branch);
            return branchDTO;
        }

        public void Remove(BranchDTO entity)
        {
            Branch branchDTO = mapper.Map<BranchDTO, Branch>(entity);
            unitofWork.Branch.Remove(branchDTO);
            unitofWork.Save();
        }

        public void Update(BranchDTO entity)
        {
            Branch branchDTO = mapper.Map<BranchDTO, Branch>(entity);
            BranchDTO branch = GetById(branchDTO.BranchID);
            branchDTO.CreatedDate = branch.CreatedDate;
            unitofWork.Branch.Update(branchDTO);
            unitofWork.Save();
        }
    }
}
