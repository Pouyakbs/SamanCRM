using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PasswordComplexityFeatures.Commands
{
    public class CreatePasswordComplexityCommand : IRequest<int>
    {
        public int PassLeastChar { get; set; }
        public int PassMaxChar { get; set; }
        public bool UseChar { get; set; }
        public bool UseDigit { get; set; }
        public bool UseSpecialChar { get; set; }
        public string SpecialChar { get; set; }
        public class CreatePasswordComplexityCommandHandler : IRequestHandler<CreatePasswordComplexityCommand, int>
        {
            private readonly IPasswordComplexityFacade passwordComplexityFacade;

            public CreatePasswordComplexityCommandHandler(IPasswordComplexityFacade passwordComplexityFacade)
            {
                this.passwordComplexityFacade = passwordComplexityFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreatePasswordComplexityCommand command, CancellationToken cancellationToken)
            {
                var passwordComplexityDTO = new PasswordComplexityDTO();
                passwordComplexityDTO.SpecialChar = command.SpecialChar;
                passwordComplexityDTO.PassMaxChar = command.PassMaxChar;
                passwordComplexityDTO.UseChar = command.UseChar;
                passwordComplexityDTO.PassLeastChar = command.PassLeastChar;
                passwordComplexityDTO.UseDigit = command.UseDigit;
                passwordComplexityDTO.UseSpecialChar = command.UseSpecialChar;
                passwordComplexityDTO.CreatedDate = DateTime.Now;
                passwordComplexityDTO.PasswordComplexityGuid = Guid.NewGuid();
                passwordComplexityFacade.Add(passwordComplexityDTO);
                return passwordComplexityDTO.PasswordComplexityID;
            }
        }
    }
}
