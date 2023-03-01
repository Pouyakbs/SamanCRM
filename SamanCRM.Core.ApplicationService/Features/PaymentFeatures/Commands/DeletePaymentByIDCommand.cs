using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PaymentFeatures.Commands
{
    public class DeletePaymentByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeletePaymentByIDCommandHandler : IRequestHandler<DeletePaymentByIDCommand, int>
        {
            private readonly IPaymentFacade paymentFacade;

            public DeletePaymentByIDCommandHandler(IPaymentFacade paymentFacade)
            {
                this.paymentFacade = paymentFacade;
            }
            public Task<int> Handle(DeletePaymentByIDCommand command, CancellationToken cancellationToken)
            {
                var payment = paymentFacade.GetById(command.Id);
                paymentFacade.Remove(payment);
                return Task.FromResult(command.Id);
            }
        }
    }
}
