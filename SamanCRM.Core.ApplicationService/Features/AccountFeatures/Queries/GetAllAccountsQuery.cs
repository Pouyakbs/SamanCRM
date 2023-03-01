using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.AccountFeatures.Queries
{
    public class GetAllAccountsQuery : IRequest<IEnumerable<AccountDTO>>
    {
        public class GetAllAccountsQueryHandler : IRequestHandler<GetAllAccountsQuery, IEnumerable<AccountDTO>>
        {
            private readonly IAccountFacade accountFacade;

            public GetAllAccountsQueryHandler(IAccountFacade accountFacade)
            {
                this.accountFacade = accountFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<AccountDTO>> Handle(GetAllAccountsQuery query, CancellationToken cancellationToken)
            {
                var accountList = accountFacade.GetAll().ToList();
                if (accountList == null)
                {
                    return null;
                }
                return accountList.AsReadOnly();
            }
        }
    }
}
