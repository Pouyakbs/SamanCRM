using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Queries
{
    public class GetPersonByIdQuery : IRequest<PersonsDTO>
    {
        public int Id { get; set; }
        public class GetPersonByIdQueryHandler : IRequestHandler<GetPersonByIdQuery, PersonsDTO>
        {
            private readonly IPersonsFacade personsFacade;

            public GetPersonByIdQueryHandler(IPersonsFacade personsFacade)
            {
                this.personsFacade = personsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<PersonsDTO> Handle(GetPersonByIdQuery query, CancellationToken cancellationToken)
            {
                var person = personsFacade.GetById(query.Id);
                if (person == null) return null;
                return person;
            }
        }
    }
}
