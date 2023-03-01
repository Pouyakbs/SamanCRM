using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IConfirmationFacade
    {
        ConfirmationDTO GetById(int id);
        IEnumerable<ConfirmationDTO> GetAll();
        int Add(ConfirmationDTO entity);
        void Remove(ConfirmationDTO entity);
        void Update(ConfirmationDTO entity);
    }
}
