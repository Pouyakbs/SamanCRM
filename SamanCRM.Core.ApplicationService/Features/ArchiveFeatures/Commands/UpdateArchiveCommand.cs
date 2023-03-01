using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ArchiveFeatures.Commands
{
    public class UpdateArchiveCommand : IRequest<int>
    {
        public int ArchiveID { get; set; }
        public string EntityType { get; set; }
        public int RecordID { get; set; }
        public string FileFormat { get; set; }
        public string FileName { get; set; }
        public string File { get; set; }
        public class UpdateArchiveCommandHandler : IRequestHandler<UpdateArchiveCommand, int>
        {
            private readonly IArchiveFacade archiveFacade;

            public UpdateArchiveCommandHandler(IArchiveFacade archiveFacade)
            {
                this.archiveFacade = archiveFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdateArchiveCommand command, CancellationToken cancellationToken)
            {
                var archiveDTO = new ArchiveDTO();
                archiveDTO.ArchiveID = command.ArchiveID;
                archiveDTO.EntityType = command.EntityType;
                archiveDTO.RecordID = command.RecordID;
                archiveDTO.FileFormat = command.FileFormat;
                archiveDTO.FileName = command.FileName;
                archiveDTO.File = command.File;
                archiveFacade.Update(archiveDTO);
                return archiveDTO.RecordID;
            }
        }
    }
}
