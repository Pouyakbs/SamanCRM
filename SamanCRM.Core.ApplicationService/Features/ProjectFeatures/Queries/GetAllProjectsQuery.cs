using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProjectFeatures.Queries
{
    public class GetAllProjectsQuery : IRequest<IEnumerable<ProjectDTO>>
    {
        public class GetAllProjectsQueryHandler : IRequestHandler<GetAllProjectsQuery, IEnumerable<ProjectDTO>>
        {
            private readonly IProjectFacade productFacade;

            public GetAllProjectsQueryHandler(IProjectFacade productFacade)
            {
                this.productFacade = productFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ProjectDTO>> Handle(GetAllProjectsQuery query, CancellationToken cancellationToken)
            {
                var projectList = productFacade.GetAll().ToList();
                if (projectList == null)
                {
                    return null;
                }
                return projectList.AsReadOnly();
            }
        }
    }
}
