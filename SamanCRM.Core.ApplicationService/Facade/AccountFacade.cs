using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class AccountFacade : IAccountFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public AccountFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(AccountDTO entity)
        {
            Account accountDTO = mapper.Map<AccountDTO, Account>(entity);
            unitofWork.Account.Add(accountDTO);
            unitofWork.Save();
            return accountDTO.AccountID;
        }

        public IEnumerable<AccountDTO> GetAll()
        {
            IEnumerable<Account> account = unitofWork.Account.GetAll();
            IEnumerable<AccountDTO> accountDTO = mapper.Map<IEnumerable<Account>, IEnumerable<AccountDTO>>(account);
            return accountDTO;
        }

        public AccountDTO GetById(int id)
        {
            Account account = unitofWork.Account.GetById(id);
            AccountDTO accountDTO = mapper.Map<Account, AccountDTO>(account);
            return accountDTO;
        }

        public void Remove(AccountDTO entity)
        {
            Account accountDTO = mapper.Map<AccountDTO, Account>(entity);
            unitofWork.Account.Remove(accountDTO);
            unitofWork.Save();
        }

        public void Update(AccountDTO entity)
        {
            Account accountDTO = mapper.Map<AccountDTO, Account>(entity);
            AccountDTO account = GetById(accountDTO.AccountID);
            accountDTO.CreatedDate = account.CreatedDate;
            unitofWork.Account.Update(accountDTO);
            unitofWork.Save();
        }
    }
}
