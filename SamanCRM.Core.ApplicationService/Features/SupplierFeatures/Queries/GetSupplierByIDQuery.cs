using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SupplierFeatures.Queries
{
    public class GetSupplierByIdQuery : IRequest<SupplierDTO>
    {
        public int Id { get; set; }
        public class GetSupplierByIdQueryHandler : IRequestHandler<GetSupplierByIdQuery, SupplierDTO>
        {
            private readonly ISupplierFacade supplierFacade;

            public GetSupplierByIdQueryHandler(ISupplierFacade supplierFacade)
            {
                this.supplierFacade = supplierFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<SupplierDTO> Handle(GetSupplierByIdQuery query, CancellationToken cancellationToken)
            {
                var supplier = supplierFacade.GetById(query.Id);
                if (supplier == null) return null;
                return supplier;
            }
        }
    }
}
