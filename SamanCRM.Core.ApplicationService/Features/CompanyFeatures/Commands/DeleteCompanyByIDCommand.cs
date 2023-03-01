using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompanyFeatures.Commands
{
    public class DeleteCompanyByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteCompanyByIDCommandHandler : IRequestHandler<DeleteCompanyByIDCommand, int>
        {
            private readonly ICompanyFacade companyFacade;

            public DeleteCompanyByIDCommandHandler(ICompanyFacade companyFacade)
            {
                this.companyFacade = companyFacade;
            }
            public Task<int> Handle(DeleteCompanyByIDCommand command, CancellationToken cancellationToken)
            {
                var company = companyFacade.GetById(command.Id);
                companyFacade.Remove(company);
                return Task.FromResult(command.Id);
            }
        }
    }
}
