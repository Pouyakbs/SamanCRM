using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PasswordComplexityFeatures.Queries
{
    public class GetAllPasswordComplexitiesQuery : IRequest<IEnumerable<PasswordComplexityDTO>>
    {
        public class GetAllPasswordComplexitiesQueryHandler : IRequestHandler<GetAllPasswordComplexitiesQuery, IEnumerable<PasswordComplexityDTO>>
        {
            private readonly IPasswordComplexityFacade passwordComplexityFacade;

            public GetAllPasswordComplexitiesQueryHandler(IPasswordComplexityFacade passwordComplexityFacade)
            {
                this.passwordComplexityFacade = passwordComplexityFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<PasswordComplexityDTO>> Handle(GetAllPasswordComplexitiesQuery query, CancellationToken cancellationToken)
            {
                var passwordComplexityList = passwordComplexityFacade.GetAll().ToList();
                if (passwordComplexityList == null)
                {
                    return null;
                }
                return passwordComplexityList.AsReadOnly();
            }
        }
    }
}
