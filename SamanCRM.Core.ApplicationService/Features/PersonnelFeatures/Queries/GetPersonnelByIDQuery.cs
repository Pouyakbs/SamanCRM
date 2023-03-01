using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Queries
{
    public class GetPersonnelByIdQuery : IRequest<PersonnelDTO>
    {
        public int Id { get; set; }
        public class GetPersonnelByIdQueryHandler : IRequestHandler<GetPersonnelByIdQuery, PersonnelDTO>
        {
            private readonly IPersonnelFacade personnelFacade;

            public GetPersonnelByIdQueryHandler(IPersonnelFacade personnelFacade)
            {
                this.personnelFacade = personnelFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<PersonnelDTO> Handle(GetPersonnelByIdQuery query, CancellationToken cancellationToken)
            {
                var personnel = personnelFacade.GetById(query.Id);
                if (personnel == null) return null;
                return personnel;
            }
        }
    }
}
