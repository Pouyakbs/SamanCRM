using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompanyFeatures.Queries
{
    public class GetCompanyByIdQuery : IRequest<CompanyDTO>
    {
        public int Id { get; set; }
        public class GetCompanyByIdQueryHandler : IRequestHandler<GetCompanyByIdQuery, CompanyDTO>
        {
            private readonly ICompanyFacade companyFacade;

            public GetCompanyByIdQueryHandler(ICompanyFacade companyFacade)
            {
                this.companyFacade = companyFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<CompanyDTO> Handle(GetCompanyByIdQuery query, CancellationToken cancellationToken)
            {
                var company = companyFacade.GetById(query.Id);
                if (company == null) return null;
                return company;
            }
        }
    }
}
