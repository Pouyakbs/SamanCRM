using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ApplicationRoleFeatures.Queries
{
    public class GetAllApplicationRolesQuery : IRequest<IEnumerable<ApplicationRoleDTO>>
    {
        public class GetAllApplicationRolesQueryHandler : IRequestHandler<GetAllApplicationRolesQuery, IEnumerable<ApplicationRoleDTO>>
        {
            private readonly IApplicationRoleFacade applicationRolesFacade;

            public GetAllApplicationRolesQueryHandler(IApplicationRoleFacade applicationRolesFacade)
            {
                this.applicationRolesFacade = applicationRolesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ApplicationRoleDTO>> Handle(GetAllApplicationRolesQuery query, CancellationToken cancellationToken)
            {
                var applicationRoleList = applicationRolesFacade.GetAll().ToList();
                if (applicationRoleList == null)
                {
                    return null;
                }
                return applicationRoleList.AsReadOnly();
            }
        }
    }
}
