using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonsFeatures.Commands
{
    public class DeletePersonByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeletePersonByIDCommandHandler : IRequestHandler<DeletePersonByIDCommand, int>
        {
            private readonly IPersonsFacade personsFacade;

            public DeletePersonByIDCommandHandler(IPersonsFacade personsFacade)
            {
                this.personsFacade = personsFacade;
            }
            public Task<int> Handle(DeletePersonByIDCommand command, CancellationToken cancellationToken)
            {
                var person = personsFacade.GetById(command.Id);
                personsFacade.Remove(person);
                return Task.FromResult(command.Id);
            }
        }
    }
}
