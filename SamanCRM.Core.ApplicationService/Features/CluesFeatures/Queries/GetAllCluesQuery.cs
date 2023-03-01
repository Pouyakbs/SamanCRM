using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CluesFeatures.Queries
{
    public class GetAllCluesQuery : IRequest<IEnumerable<CluesDTO>>
    {
        public class GetAllCluesQueryHandler : IRequestHandler<GetAllCluesQuery, IEnumerable<CluesDTO>>
        {
            private readonly ICluesFacade cluesFacade;

            public GetAllCluesQueryHandler(ICluesFacade cluesFacade)
            {
                this.cluesFacade = cluesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<CluesDTO>> Handle(GetAllCluesQuery query, CancellationToken cancellationToken)
            {
                var cluesList = cluesFacade.GetAll().ToList();
                if (cluesList == null)
                {
                    return null;
                }
                return cluesList.AsReadOnly();
            }
        }
    }
}
