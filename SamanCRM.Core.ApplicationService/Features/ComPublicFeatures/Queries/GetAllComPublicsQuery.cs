using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Queries
{

    public class GetAllComPublicsQuery : IRequest<IEnumerable<ComPublicDTO>>
    {
        public class GetAllComPublicsQueryHandler : IRequestHandler<GetAllComPublicsQuery, IEnumerable<ComPublicDTO>>
        {
            private readonly IComPublicFacade comPublicFacade;

            public GetAllComPublicsQueryHandler(IComPublicFacade comPublicFacade)
            {
                this.comPublicFacade = comPublicFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ComPublicDTO>> Handle(GetAllComPublicsQuery query, CancellationToken cancellationToken)
            {
                var comPublicList = comPublicFacade.GetAll().ToList();
                if (comPublicList == null)
                {
                    return null;
                }
                return comPublicList.AsReadOnly();
            }
        }
    }
}
