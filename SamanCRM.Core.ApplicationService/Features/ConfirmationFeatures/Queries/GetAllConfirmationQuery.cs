using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConfirmationFeatures.Queries
{
    public class GetAllConfirmationsQuery : IRequest<IEnumerable<ConfirmationDTO>>
    {
        public class GetAllConfirmationsQueryHandler : IRequestHandler<GetAllConfirmationsQuery, IEnumerable<ConfirmationDTO>>
        {
            private readonly IConfirmationFacade confirmationFacade;

            public GetAllConfirmationsQueryHandler(IConfirmationFacade confirmationFacade)
            {
                this.confirmationFacade = confirmationFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<ConfirmationDTO>> Handle(GetAllConfirmationsQuery query, CancellationToken cancellationToken)
            {
                var ConfirmationsList = confirmationFacade.GetAll().ToList();
                if (ConfirmationsList == null)
                {
                    return null;
                }
                return ConfirmationsList.AsReadOnly();
            }
        }
    }
}
