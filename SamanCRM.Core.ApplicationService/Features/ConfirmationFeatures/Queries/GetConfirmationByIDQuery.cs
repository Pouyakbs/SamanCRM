using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConfirmationFeatures.Queries
{
    public class GetConfirmationByIdQuery : IRequest<ConfirmationDTO>
    {
        public int Id { get; set; }
        public class GetConfirmationByIdQueryHandler : IRequestHandler<GetConfirmationByIdQuery, ConfirmationDTO>
        {
            private readonly IConfirmationFacade confirmationFacade;

            public GetConfirmationByIdQueryHandler(IConfirmationFacade confirmationFacade)
            {
                this.confirmationFacade = confirmationFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<ConfirmationDTO> Handle(GetConfirmationByIdQuery query, CancellationToken cancellationToken)
            {
                var confirmation = confirmationFacade.GetById(query.Id);
                if (confirmation == null) return null;
                return confirmation;
            }
        }
    }
}
