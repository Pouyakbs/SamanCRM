using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AccountFeatures.Queries
{
    public class GetAccountByIdQuery : IRequest<AccountDTO>
    {
        public int Id { get; set; }
        public class GetAccountByIdQueryHandler : IRequestHandler<GetAccountByIdQuery, AccountDTO>
        {
            private readonly IAccountFacade accountFacade;

            public GetAccountByIdQueryHandler(IAccountFacade accountFacade)
            {
                this.accountFacade = accountFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<AccountDTO> Handle(GetAccountByIdQuery query, CancellationToken cancellationToken)
            {
                var account = accountFacade.GetById(query.Id);
                if (account == null) return null;
                return account;
            }
        }
    }
}
