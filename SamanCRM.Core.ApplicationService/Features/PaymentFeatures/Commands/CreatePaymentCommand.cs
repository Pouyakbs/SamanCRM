using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PaymentFeatures.Commands
{
    public class CreatePaymentCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Number { get; set; }
        public string ParentName { get; set; }
        public string Associated { get; set; }
        public string Direction { get; set; }
        public DateTime ForecastedDate { get; set; }
        public string MoneyUnit { get; set; }
        public DateTime DoneDate { get; set; }
        public double Amount { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public string CustomerSMS { get; set; }
        public string Customer { get; set; }
        public string ReferenceNum { get; set; }
        public string PaymentCompany { get; set; }
        public string Branch { get; set; }
        public string Fund { get; set; }
        public string Assignedcount { get; set; }
        public string Remaincount { get; set; }
        public string Factor { get; set; }
        public string Desc { get; set; }
        public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand, int>
        {
            private readonly IPaymentFacade paymentFacade;

            public CreatePaymentCommandHandler(IPaymentFacade paymentFacade)
            {
                this.paymentFacade = paymentFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreatePaymentCommand command, CancellationToken cancellationToken)
            {
                var paymentDTO = new PaymentDTO();
                paymentDTO.Amount = command.Amount;
                paymentDTO.Branch = command.Branch;
                paymentDTO.Customer = command.Customer;
                paymentDTO.CustomerSMS = command.CustomerSMS;
                paymentDTO.Desc = command.Desc;
                paymentDTO.Direction = command.Direction;
                paymentDTO.DoneDate = command.DoneDate;
                paymentDTO.ForecastedDate = command.ForecastedDate;
                paymentDTO.Fund = command.Fund;
                paymentDTO.Assignedcount = command.Assignedcount;
                paymentDTO.Remaincount = command.Remaincount;
                paymentDTO.Factor = command.Factor;
                paymentDTO.MoneyUnit = command.MoneyUnit;
                paymentDTO.Name = command.Name;
                paymentDTO.Number = command.Number;
                paymentDTO.ParentName = command.ParentName;
                paymentDTO.Associated = command.Associated;
                paymentDTO.PaymentCompany = command.PaymentCompany;
                paymentDTO.PaymentMethod = command.PaymentMethod;
                paymentDTO.ReferenceNum = command.ReferenceNum;
                paymentDTO.Status = command.Status;
                paymentDTO.Type = command.Type;
                paymentDTO.CreatedDate = DateTime.Now;
                paymentDTO.PaymentGuid = Guid.NewGuid();
                paymentFacade.Add(paymentDTO);
                return paymentDTO.PaymentID;
            }
        }
    }
}
