using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ArchiveFeatures.Commands
{
    public class CreateArchiveCommand : IRequest<int>
    {
        public string EntityType { get; set; }
        public int RecordID { get; set; }
        public string FileFormat { get; set; }
        public string FileName { get; set; }
        public string File { get; set; }
        public class CreateArchiveCommandHandler : IRequestHandler<CreateArchiveCommand, int>
        {
            private readonly IArchiveFacade archiveFacade;

            public CreateArchiveCommandHandler(IArchiveFacade archiveFacade)
            {
                this.archiveFacade = archiveFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateArchiveCommand command, CancellationToken cancellationToken)
            {
                var archiveDTO = new ArchiveDTO();
                archiveDTO.EntityType = command.EntityType;
                archiveDTO.RecordID = command.RecordID;
                archiveDTO.FileFormat = command.FileFormat;
                archiveDTO.FileName = command.FileName;
                archiveDTO.File = command.File;
                archiveDTO.CreatedDate = DateTime.Now;
                archiveDTO.ArchiveGuid = Guid.NewGuid();
                archiveFacade.Add(archiveDTO);
                return archiveDTO.RecordID;
            }
        }
    }
}
