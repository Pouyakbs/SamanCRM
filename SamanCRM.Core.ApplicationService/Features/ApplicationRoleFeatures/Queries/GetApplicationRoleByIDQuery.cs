using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationRoleFeatures.Queries
{
    public class GetApplicationRoleByIdQuery : IRequest<ApplicationRoleDTO>
    {
        public int Id { get; set; }
        public class GetApplicationRoleByIdQueryHandler : IRequestHandler<GetApplicationRoleByIdQuery, ApplicationRoleDTO>
        {
            private readonly IApplicationRoleFacade applicationRoleFacade;

            public GetApplicationRoleByIdQueryHandler(IApplicationRoleFacade applicationRoleFacade)
            {
                this.applicationRoleFacade = applicationRoleFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ApplicationRoleDTO> Handle(GetApplicationRoleByIdQuery query, CancellationToken cancellationToken)
            {
                var applicationRole = applicationRoleFacade.GetById(query.Id);
                if (applicationRole == null) return null;
                return applicationRole;
            }
        }
    }
}
