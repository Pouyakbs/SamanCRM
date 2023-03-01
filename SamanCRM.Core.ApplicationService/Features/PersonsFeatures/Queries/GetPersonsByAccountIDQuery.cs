using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Queries
{
    public class GetPersonsByAccountIDQuery : IRequest<IEnumerable<PersonsDTO>>
    {
        public int ID { get; set; }
        public class GetPersonsByAccountIDQueryHandler : IRequestHandler<GetPersonsByAccountIDQuery, IEnumerable<PersonsDTO>>
        {
            private readonly IPersonsFacade personsFacade;

            public GetPersonsByAccountIDQueryHandler(IPersonsFacade personsFacade)
            {
                this.personsFacade = personsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<PersonsDTO>> Handle(GetPersonsByAccountIDQuery query, CancellationToken cancellationToken)
            {
                var personList = personsFacade.GetByAccountId(query.ID).ToList();
                if (personList == null)
                {
                    return null;
                }
                return personList.AsReadOnly();
            }
        }
    }
}
