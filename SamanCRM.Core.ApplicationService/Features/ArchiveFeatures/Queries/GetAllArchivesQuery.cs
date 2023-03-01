using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ArchiveFeatures.Queries
{
    public class GetAllArchivesQuery : IRequest<IEnumerable<ArchiveDTO>>
    {
        public class GetAllArchivesQueryHandler : IRequestHandler<GetAllArchivesQuery, IEnumerable<ArchiveDTO>>
        {
            private readonly IArchiveFacade archiveFacade;

            public GetAllArchivesQueryHandler(IArchiveFacade archiveFacade)
            {
                this.archiveFacade = archiveFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ArchiveDTO>> Handle(GetAllArchivesQuery query, CancellationToken cancellationToken)
            {
                var archiveList = archiveFacade.GetAll().ToList();
                if (archiveList == null)
                {
                    return null;
                }
                return archiveList.AsReadOnly();
            }
        }
    }
}
