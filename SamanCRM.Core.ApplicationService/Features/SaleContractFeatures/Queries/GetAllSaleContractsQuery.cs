using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SaleContractFeatures.Queries
{
    public class GetAllSaleContractsQuery : IRequest<IEnumerable<SaleContractDTO>>
    {
        public class GetAllSaleContractsQueryHandler : IRequestHandler<GetAllSaleContractsQuery, IEnumerable<SaleContractDTO>>
        {
            private readonly ISaleContractFacade saleContractFacade;

            public GetAllSaleContractsQueryHandler(ISaleContractFacade saleContractFacade)
            {
                this.saleContractFacade = saleContractFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<SaleContractDTO>> Handle(GetAllSaleContractsQuery query, CancellationToken cancellationToken)
            {
                var saleContractList = saleContractFacade.GetAll().ToList();
                if (saleContractList == null)
                {
                    return null;
                }
                return saleContractList.AsReadOnly();
            }
        }
    }
}
