using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.CompetitorFeatures.Commands
{
    public class UpdateCompetitorCommand : IRequest<int>
    {
        public int CompetitorID { get; set; }
        public string Name { get; set; }
        public string CeoName { get; set; }
        public string ContactFields { get; set; }
        public string CompAddress { get; set; }
        public string CompLong { get; set; }
        public string CompLat { get; set; }
        public string Website { get; set; }
        public string ActivityField { get; set; }
        public string ActivityExp { get; set; }
        public string ProductFields { get; set; }
        public string Strengths { get; set; }
        public string WeakPoints { get; set; }
        public List<string> CompetitorFile { get; set; }
        public class UpdateCompetitorCommandHandler : IRequestHandler<UpdateCompetitorCommand, int>
        {
            private readonly ICompetitorFacade competitorFacade;

            public UpdateCompetitorCommandHandler(ICompetitorFacade competitorFacade)
            {
                this.competitorFacade = competitorFacade;
            }
            public Task<int> Handle(UpdateCompetitorCommand command, CancellationToken cancellationToken)
            {
                var competitorDTO = new CompetitorDTO();
                competitorDTO.CompetitorID = command.CompetitorID;
                competitorDTO.Name = command.Name;
                competitorDTO.CeoName = command.CeoName;
                competitorDTO.ContactFields = command.ContactFields;
                competitorDTO.CompAddress = command.CompAddress;
                competitorDTO.CompLong = command.CompLong;
                competitorDTO.CompLat = command.CompLat;
                competitorDTO.Website = command.Website;
                competitorDTO.ActivityField = command.ActivityField;
                competitorDTO.ActivityExp = command.ActivityExp;
                competitorDTO.ProductFields = command.ProductFields;
                competitorDTO.Strengths = command.Strengths;
                competitorDTO.WeakPoints = command.WeakPoints;
                competitorDTO.CompetitorFile = command.CompetitorFile;
                competitorFacade.Update(competitorDTO);
                return Task.FromResult(command.CompetitorID);
            }
        }
    }
}
