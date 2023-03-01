using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ConnectionsFeatures.Commands
{
    public class CreateConnectionsCommand : IRequest<int>
    {
        public string Title { get; set; }
        public bool ActiveConnection { get; set; }
        public string MaduleName { get; set; }
        public string RecordType { get; set; }
        public string Condition { get; set; }
        public string ConditionAmount { get; set; }
        public bool SendMessage { get; set; }
        public bool SendEmail { get; set; }
        public string MessageTitle { get; set; }
        public string EmailTitle { get; set; }
        public string Frame { get; set; }
        public class CreateConnectionsCommandHandler : IRequestHandler<CreateConnectionsCommand, int>
        {
            private readonly IConnectionsFacade connectionsFacade;

            public CreateConnectionsCommandHandler(IConnectionsFacade connectionsFacade)
            {
                this.connectionsFacade = connectionsFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateConnectionsCommand command, CancellationToken cancellationToken)
            {
                var connectionsDTO = new ConnectionsDTO();
                connectionsDTO.Title = command.Title;
                connectionsDTO.ActiveConnection = command.ActiveConnection;
                connectionsDTO.MaduleName = command.MaduleName;
                connectionsDTO.RecordType = command.RecordType;
                connectionsDTO.Condition = command.Condition;
                connectionsDTO.ConditionAmount = command.ConditionAmount;
                connectionsDTO.SendMessage = command.SendMessage;
                connectionsDTO.SendEmail = command.SendEmail;
                connectionsDTO.MessageTitle = command.MessageTitle;
                connectionsDTO.EmailTitle = command.EmailTitle;
                connectionsDTO.Frame = command.Frame;
                connectionsDTO.CreatedDate = DateTime.Now;
                connectionsDTO.ConnectionsGuid = Guid.NewGuid();
                connectionsFacade.Add(connectionsDTO);
                return connectionsDTO.ConnectionsID;
            }
        }
    }
}
