using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PasswordComplexityFeatures.Queries
{
    public class GetPasswordComplexityByIdQuery : IRequest<PasswordComplexityDTO>
    {
        public int Id { get; set; }
        public class GetPasswordComplexityByIdQueryHandler : IRequestHandler<GetPasswordComplexityByIdQuery, PasswordComplexityDTO>
        {
            private readonly IPasswordComplexityFacade passwordComplexityFacade;

            public GetPasswordComplexityByIdQueryHandler(IPasswordComplexityFacade passwordComplexityFacade)
            {
                this.passwordComplexityFacade = passwordComplexityFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<PasswordComplexityDTO> Handle(GetPasswordComplexityByIdQuery query, CancellationToken cancellationToken)
            {
                var passwordComplexity = passwordComplexityFacade.GetById(query.Id);
                if (passwordComplexity == null) return null;
                return passwordComplexity;
            }
        }
    }
}
