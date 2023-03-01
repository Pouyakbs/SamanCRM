using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicFeatures.Queries
{
    public class GetComPublicByIDQuery : IRequest<ComPublicDTO>
    {
        public int Id { get; set; }
        public class GetComPublicByIDQueryHandler : IRequestHandler<GetComPublicByIDQuery, ComPublicDTO>
        {
            private readonly IComPublicFacade comPublicFacade;

            public GetComPublicByIDQueryHandler(IComPublicFacade comPublicFacade)
            {
                this.comPublicFacade = comPublicFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ComPublicDTO> Handle(GetComPublicByIDQuery query, CancellationToken cancellationToken)
            {
                var comPublic = comPublicFacade.GetById(query.Id);
                if (comPublic == null) return null;
                return comPublic;
            }
        }
    }
}
