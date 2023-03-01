using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.PersonnelFeatures.Queries
{
    public class CheckRoleByIdQuery : IRequest<bool>
    {
        public int Id { get; set; }
        public class CheckRoleByIdQueryHandler : IRequestHandler<CheckRoleByIdQuery, bool>
        {
            private readonly IPersonnelFacade personnelFacade;

            public CheckRoleByIdQueryHandler(IPersonnelFacade personnelFacade)
            {
                this.personnelFacade = personnelFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<bool> Handle(CheckRoleByIdQuery query, CancellationToken cancellationToken)
            {
                var personnel = personnelFacade.RoleExistance(query.Id);
                return personnel;
            }
        }
    }
}
