using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Queries
{
    public class GetAllPersonnelsQuery : IRequest<IEnumerable<PersonnelDTO>>
    {
        public class GetAllPersonnelsQueryHandler : IRequestHandler<GetAllPersonnelsQuery, IEnumerable<PersonnelDTO>>
        {
            private readonly IPersonnelFacade personnelsFacade;

            public GetAllPersonnelsQueryHandler(IPersonnelFacade personnelsFacade)
            {
                this.personnelsFacade = personnelsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<PersonnelDTO>> Handle(GetAllPersonnelsQuery query, CancellationToken cancellationToken)
            {
                var personnelList = personnelsFacade.GetAll().ToList();
                if (personnelList == null)
                {
                    return null;
                }
                return personnelList.AsReadOnly();
            }
        }
    }
}
