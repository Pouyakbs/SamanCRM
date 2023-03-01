using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SaleContractFeatures.Queries
{
    public class GetSaleContractByIdQuery : IRequest<SaleContractDTO>
    {
        public int Id { get; set; }
        public class GetSaleContractByIdQueryHandler : IRequestHandler<GetSaleContractByIdQuery, SaleContractDTO>
        {
            private readonly ISaleContractFacade saleContractFacade;

            public GetSaleContractByIdQueryHandler(ISaleContractFacade saleContractFacade)
            {
                this.saleContractFacade = saleContractFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<SaleContractDTO> Handle(GetSaleContractByIdQuery query, CancellationToken cancellationToken)
            {
                var saleContract = saleContractFacade.GetById(query.Id);
                if (saleContract == null) return null;
                return saleContract;
            }
        }
    }
}
