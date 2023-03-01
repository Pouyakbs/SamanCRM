using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IPaymentFacade
    {
        PaymentDTO GetById(int id);
        IEnumerable<PaymentDTO> GetAll();
        int Add(PaymentDTO entity);
        void Remove(PaymentDTO entity);
        void Update(PaymentDTO entity);
    }
}
