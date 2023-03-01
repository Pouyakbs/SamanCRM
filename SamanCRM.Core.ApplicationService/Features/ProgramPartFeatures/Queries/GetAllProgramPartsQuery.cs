using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProgramPartFeatures.Queries
{
    public class GetAllProgramPartsQuery : IRequest<IEnumerable<ProgramPartDTO>>
    {
        public class GetAllProgramPartsQueryHandler : IRequestHandler<GetAllProgramPartsQuery, IEnumerable<ProgramPartDTO>>
        {
            private readonly IProgramPartFacade programPartFacade;

            public GetAllProgramPartsQueryHandler(IProgramPartFacade programPartFacade)
            {
                this.programPartFacade = programPartFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ProgramPartDTO>> Handle(GetAllProgramPartsQuery query, CancellationToken cancellationToken)
            {
                var programPartList = programPartFacade.GetAll().ToList();
                if (programPartList == null)
                {
                    return null;
                }
                return programPartList.AsReadOnly();
            }
        }
    }
}
