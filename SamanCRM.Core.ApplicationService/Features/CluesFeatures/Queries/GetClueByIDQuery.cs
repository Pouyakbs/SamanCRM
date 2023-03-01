using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CluesFeatures.Queries
{
    public class GetClueByIdQuery : IRequest<CluesDTO>
    {
        public int Id { get; set; }
        public class GetClueByIdQueryHandler : IRequestHandler<GetClueByIdQuery, CluesDTO>
        {
            private readonly ICluesFacade cluesFacade;

            public GetClueByIdQueryHandler(ICluesFacade cluesFacade)
            {
                this.cluesFacade = cluesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<CluesDTO> Handle(GetClueByIdQuery query, CancellationToken cancellationToken)
            {
                var clue = cluesFacade.GetById(query.Id);
                if (clue == null) return null;
                return clue;
            }
        }
    }
}
