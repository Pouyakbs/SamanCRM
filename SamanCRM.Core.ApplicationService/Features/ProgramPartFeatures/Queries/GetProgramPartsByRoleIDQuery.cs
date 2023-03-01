using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Queries
{
    public class GetProgramPartByRoleIDQuery : IRequest<IEnumerable<ProgramPartDTO>>
    {
        public int Id { get; set; }
        public class GetProgramPartByRoleIDQueryHandler : IRequestHandler<GetProgramPartByRoleIDQuery, IEnumerable<ProgramPartDTO>>
        {
            private readonly IProgramPartFacade programPartFacade;

            public GetProgramPartByRoleIDQueryHandler(IProgramPartFacade programPartFacade)
            {
                this.programPartFacade = programPartFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ProgramPartDTO>> Handle(GetProgramPartByRoleIDQuery query, CancellationToken cancellationToken)
            {
                var programPart = programPartFacade.GetByRoleID(query.Id);
                if (programPart == null) return null;
                return programPart;
            }
        }
    }
}
