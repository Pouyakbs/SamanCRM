using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PaymentFeatures.Queries
{
    public class GetAllPaymentsQuery : IRequest<IEnumerable<PaymentDTO>>
    {
        public class GetAllPaymentsQueryHandler : IRequestHandler<GetAllPaymentsQuery, IEnumerable<PaymentDTO>>
        {
            private readonly IPaymentFacade paymentFacade;

            public GetAllPaymentsQueryHandler(IPaymentFacade paymentFacade)
            {
                this.paymentFacade = paymentFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<PaymentDTO>> Handle(GetAllPaymentsQuery query, CancellationToken cancellationToken)
            {
                var paymentsList = paymentFacade.GetAll().ToList();
                if (paymentsList == null)
                {
                    return null;
                }
                return paymentsList.AsReadOnly();
            }
        }
    }
}
