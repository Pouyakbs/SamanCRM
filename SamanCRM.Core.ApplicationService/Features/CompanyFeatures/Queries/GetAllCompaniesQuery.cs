using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompanyFeatures.Queries
{
    public class GetAllCompaniesQuery : IRequest<IEnumerable<CompanyDTO>>
    {
        public class GetAllCompaniesQueryHandler : IRequestHandler<GetAllCompaniesQuery, IEnumerable<CompanyDTO>>
        {
            private readonly ICompanyFacade companyFacade;

            public GetAllCompaniesQueryHandler(ICompanyFacade companyFacade)
            {
                this.companyFacade = companyFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<CompanyDTO>> Handle(GetAllCompaniesQuery query, CancellationToken cancellationToken)
            {
                var companiesList = companyFacade.GetAll().ToList();
                if (companiesList == null)
                {
                    return null;
                }
                return companiesList.AsReadOnly();
            }
        }
    }
}
