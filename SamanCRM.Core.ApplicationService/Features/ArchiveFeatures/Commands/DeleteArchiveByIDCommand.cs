using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ArchiveFeatures.Commands
{
    public class DeleteArchiveByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteArchiveByIDCommandHandler : IRequestHandler<DeleteArchiveByIDCommand, int>
        {
            private readonly IArchiveFacade archiveFacade;

            public DeleteArchiveByIDCommandHandler(IArchiveFacade archiveFacade)
            {
                this.archiveFacade = archiveFacade;
            }
            public Task<int> Handle(DeleteArchiveByIDCommand command, CancellationToken cancellationToken)
            {
                var archive = archiveFacade.GetById(command.Id);
                archiveFacade.Remove(archive);
                return Task.FromResult(command.Id);
            }
        }
    }
}
