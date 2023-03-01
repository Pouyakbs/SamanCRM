using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Queries
{
    public class GetAllPersonsQuery : IRequest<IEnumerable<PersonsDTO>>
    {
        public class GetAllPersonsQueryHandler : IRequestHandler<GetAllPersonsQuery, IEnumerable<PersonsDTO>>
        {
            private readonly IPersonsFacade personsFacade;

            public GetAllPersonsQueryHandler(IPersonsFacade personsFacade)
            {
                this.personsFacade = personsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<PersonsDTO>> Handle(GetAllPersonsQuery query, CancellationToken cancellationToken)
            {
                var personList = personsFacade.GetAll().ToList();
                if (personList == null)
                {
                    return null;
                }
                return personList.AsReadOnly();
            }
        }
    }
}
