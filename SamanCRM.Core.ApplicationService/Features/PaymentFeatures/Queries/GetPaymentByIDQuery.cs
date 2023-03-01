using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PaymentFeatures.Queries
{
    public class GetPaymentByIdQuery : IRequest<PaymentDTO>
    {
        public int Id { get; set; }
        public class GetPaymentByIdQueryHandler : IRequestHandler<GetPaymentByIdQuery, PaymentDTO>
        {
            private readonly IPaymentFacade paymentFacade;

            public GetPaymentByIdQueryHandler(IPaymentFacade paymentFacade)
            {
                this.paymentFacade = paymentFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<PaymentDTO> Handle(GetPaymentByIdQuery query, CancellationToken cancellationToken)
            {
                var payment = paymentFacade.GetById(query.Id);
                if (payment == null) return null;
                return payment;
            }
        }
    }
}
