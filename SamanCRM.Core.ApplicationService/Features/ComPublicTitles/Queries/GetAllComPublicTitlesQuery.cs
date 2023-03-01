using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ComPublicTitles.Queries
{

    public class GetAllComPublicTitlesQuery : IRequest<IEnumerable<ComPublicTitlesDTO>>
    {
        public class GetAllComPublicTitlesQueryHandler : IRequestHandler<GetAllComPublicTitlesQuery, IEnumerable<ComPublicTitlesDTO>>
        {
            private readonly IComPublicTitlesFacade comPublicTitlesFacade;

            public GetAllComPublicTitlesQueryHandler(IComPublicTitlesFacade comPublicTitlesFacade)
            {
                this.comPublicTitlesFacade = comPublicTitlesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ComPublicTitlesDTO>> Handle(GetAllComPublicTitlesQuery query, CancellationToken cancellationToken)
            {
                var comPublicTitlesList = comPublicTitlesFacade.GetAll().ToList();
                if (comPublicTitlesList == null)
                {
                    return null;
                }
                return comPublicTitlesList.AsReadOnly();
            }
        }
    }
}
