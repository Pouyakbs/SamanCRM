using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SupplierFeatures.Queries
{
    public class GetAllSuppliersQuery : IRequest<IEnumerable<SupplierDTO>>
    {
        public class GetAllSuppliersQueryHandler : IRequestHandler<GetAllSuppliersQuery, IEnumerable<SupplierDTO>>
        {
            private readonly ISupplierFacade supplierFacade;

            public GetAllSuppliersQueryHandler(ISupplierFacade supplierFacade)
            {
                this.supplierFacade = supplierFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<SupplierDTO>> Handle(GetAllSuppliersQuery query, CancellationToken cancellationToken)
            {
                var SupplierList = supplierFacade.GetAll().ToList();
                if (SupplierList == null)
                {
                    return null;
                }
                return SupplierList.AsReadOnly();
            }
        }
    }
}
