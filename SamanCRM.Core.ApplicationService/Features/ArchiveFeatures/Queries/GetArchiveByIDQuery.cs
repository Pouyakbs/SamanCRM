using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ArchiveFeatures.Queries
{
    public class GetArchiveByIdQuery : IRequest<ArchiveDTO>
    {
        public int Id { get; set; }
        public class GetArchiveByIdQueryHandler : IRequestHandler<GetArchiveByIdQuery, ArchiveDTO>
        {
            private readonly IArchiveFacade archiveFacade;

            public GetArchiveByIdQueryHandler(IArchiveFacade archiveFacade)
            {
                this.archiveFacade = archiveFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ArchiveDTO> Handle(GetArchiveByIdQuery query, CancellationToken cancellationToken)
            {
                var archive = archiveFacade.GetById(query.Id);
                if (archive == null) return null;
                return archive;
            }
        }
    }
}
