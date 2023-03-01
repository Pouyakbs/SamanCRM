using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Queries
{
    public class GetComPublicByProgramPartIDQuery : IRequest<IEnumerable<ComPublicDTO>>
    {
        public int id { get; set; }
        public class GetComPublicByProgramPartIDQueryHandler : IRequestHandler<GetComPublicByProgramPartIDQuery, IEnumerable<ComPublicDTO>>
        {
            private readonly IComPublicFacade comPublicFacade;

            public GetComPublicByProgramPartIDQueryHandler(IComPublicFacade comPublicFacade)
            {
                this.comPublicFacade = comPublicFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ComPublicDTO>> Handle(GetComPublicByProgramPartIDQuery query, CancellationToken cancellationToken)
            {
                var comPublicList = comPublicFacade.GetByProgramPartId(query.id);
                if (comPublicList == null)
                {
                    return null;
                }
                return comPublicList.AsReadOnly();
            }
        }
    }
}
