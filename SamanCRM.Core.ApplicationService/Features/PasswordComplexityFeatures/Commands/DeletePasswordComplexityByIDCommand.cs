using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PasswordComplexityFeatures.Commands
{
    public class DeletePasswordComplexityByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeletePasswordComplexityByIDCommandHandler : IRequestHandler<DeletePasswordComplexityByIDCommand, int>
        {
            private readonly IPasswordComplexityFacade passwordComplexityFacade;

            public DeletePasswordComplexityByIDCommandHandler(IPasswordComplexityFacade passwordComplexityFacade)
            {
                this.passwordComplexityFacade = passwordComplexityFacade;
            }
            public Task<int> Handle(DeletePasswordComplexityByIDCommand command, CancellationToken cancellationToken)
            {
                var passwordComplexity = passwordComplexityFacade.GetById(command.Id);
                passwordComplexityFacade.Remove(passwordComplexity);
                return Task.FromResult(command.Id);
            }
        }
    }
}
