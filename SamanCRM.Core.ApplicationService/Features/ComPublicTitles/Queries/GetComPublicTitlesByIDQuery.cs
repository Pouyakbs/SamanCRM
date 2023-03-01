using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicTitles.Queries
{
    public class GetComPublicTitlesByIDQuery : IRequest<ComPublicTitlesDTO>
    {
        public int Id { get; set; }
        public class GetComPublicTitlesByIDQueryHandler : IRequestHandler<GetComPublicTitlesByIDQuery, ComPublicTitlesDTO>
        {
            private readonly IComPublicTitlesFacade comPublicTitlesFacade;

            public GetComPublicTitlesByIDQueryHandler(IComPublicTitlesFacade comPublicTitlesFacade)
            {
                this.comPublicTitlesFacade = comPublicTitlesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ComPublicTitlesDTO> Handle(GetComPublicTitlesByIDQuery query, CancellationToken cancellationToken)
            {
                var comPublicTitles = comPublicTitlesFacade.GetById(query.Id);
                if (comPublicTitles == null) return null;
                return comPublicTitles;
            }
        }
    }
}
