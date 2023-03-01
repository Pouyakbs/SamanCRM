using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class PaymentFacade : IPaymentFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public PaymentFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(PaymentDTO entity)
        {
            Payment paymentDTO = mapper.Map<PaymentDTO, Payment>(entity);
            unitofWork.Payment.Add(paymentDTO);
            unitofWork.Save();
            return paymentDTO.PaymentID;
        }

        public IEnumerable<PaymentDTO> GetAll()
        {
            IEnumerable<Payment> payment = unitofWork.Payment.GetAll();
            IEnumerable<PaymentDTO> paymentDTO = mapper.Map<IEnumerable<Payment>, IEnumerable<PaymentDTO>>(payment);
            return paymentDTO;
        }

        public PaymentDTO GetById(int id)
        {
            Payment payment = unitofWork.Payment.GetById(id);
            PaymentDTO paymentDTO = mapper.Map<Payment, PaymentDTO>(payment);
            return paymentDTO;
        }

        public void Remove(PaymentDTO entity)
        {
            Payment paymentDTO = mapper.Map<PaymentDTO, Payment>(entity);
            unitofWork.Payment.Remove(paymentDTO);
            unitofWork.Save();
        }

        public void Update(PaymentDTO entity)
        {
            Payment paymentDTO = mapper.Map<PaymentDTO, Payment>(entity);
            PaymentDTO payment = GetById(paymentDTO.PaymentID);
            paymentDTO.CreatedDate = payment.CreatedDate;
            unitofWork.Payment.Update(paymentDTO);
            unitofWork.Save();
        }
    }
}
