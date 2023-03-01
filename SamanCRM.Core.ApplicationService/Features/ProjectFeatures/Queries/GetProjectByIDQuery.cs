using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProjectFeatures.Queries
{
    public class GetProjectByIdQuery : IRequest<ProjectDTO>
    {
        public int Id { get; set; }
        public class GetProjectByIdQueryHandler : IRequestHandler<GetProjectByIdQuery, ProjectDTO>
        {
            private readonly IProjectFacade projectFacade;

            public GetProjectByIdQueryHandler(IProjectFacade projectFacade)
            {
                this.projectFacade = projectFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ProjectDTO> Handle(GetProjectByIdQuery query, CancellationToken cancellationToken)
            {
                var project = projectFacade.GetById(query.Id);
                if (project == null) return null;
                return project;
            }
        }
    }
}
