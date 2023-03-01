using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AccountFeatures.Commands
{
    public class DeleteAccountByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteAccountByIDCommandHandler : IRequestHandler<DeleteAccountByIDCommand, int>
        {
            private readonly IAccountFacade accountFacade;

            public DeleteAccountByIDCommandHandler(IAccountFacade accountFacade)
            {
                this.accountFacade = accountFacade;
            }
            public Task<int> Handle(DeleteAccountByIDCommand command, CancellationToken cancellationToken)
            {
                var account = accountFacade.GetById(command.Id);
                accountFacade.Remove(account);
                return Task.FromResult(command.Id);
            }
        }
    }
}
