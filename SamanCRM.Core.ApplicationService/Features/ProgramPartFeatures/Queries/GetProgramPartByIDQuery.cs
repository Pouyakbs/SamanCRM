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
    public class GetProgramPartByIdQuery : IRequest<ProgramPartDTO>
    {
        public int Id { get; set; }
        public class GetProgramPartByIdQueryHandler : IRequestHandler<GetProgramPartByIdQuery, ProgramPartDTO>
        {
            private readonly IProgramPartFacade programPartFacade;

            public GetProgramPartByIdQueryHandler(IProgramPartFacade programPartFacade)
            {
                this.programPartFacade = programPartFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ProgramPartDTO> Handle(GetProgramPartByIdQuery query, CancellationToken cancellationToken)
            {
                var programPart = programPartFacade.GetById(query.Id);
                if (programPart == null) return null;
                return programPart;
            }
        }
    }
}
