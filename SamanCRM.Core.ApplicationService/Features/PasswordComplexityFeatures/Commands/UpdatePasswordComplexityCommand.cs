using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PasswordComplexityFeatures.Commands
{
    public class UpdatePasswordComplexityCommand : IRequest<int>
    {
        public int PasswordComplexityID { get; set; }
        public int PassLeastChar { get; set; }
        public int PassMaxChar { get; set; }
        public bool UseChar { get; set; }
        public bool UseDigit { get; set; }
        public bool UseSpecialChar { get; set; }
        public string SpecialChar { get; set; }
        public class UpdatePasswordComplexityCommandHandler : IRequestHandler<UpdatePasswordComplexityCommand, int>
        {
            private readonly IPasswordComplexityFacade passwordComplexityFacade;

            public UpdatePasswordComplexityCommandHandler(IPasswordComplexityFacade passwordComplexityFacade)
            {
                this.passwordComplexityFacade = passwordComplexityFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(UpdatePasswordComplexityCommand command, CancellationToken cancellationToken)
            {
                var passwordComplexityDTO = new PasswordComplexityDTO();
                passwordComplexityDTO.PasswordComplexityID = command.PasswordComplexityID;
                passwordComplexityDTO.SpecialChar = command.SpecialChar;
                passwordComplexityDTO.PassMaxChar = command.PassMaxChar;
                passwordComplexityDTO.UseChar = command.UseChar;
                passwordComplexityDTO.PassLeastChar = command.PassLeastChar;
                passwordComplexityDTO.UseDigit = command.UseDigit;
                passwordComplexityDTO.UseSpecialChar = command.UseSpecialChar;
                passwordComplexityFacade.Update(passwordComplexityDTO);
                return passwordComplexityDTO.PasswordComplexityID;
            }
        }
    }
}
