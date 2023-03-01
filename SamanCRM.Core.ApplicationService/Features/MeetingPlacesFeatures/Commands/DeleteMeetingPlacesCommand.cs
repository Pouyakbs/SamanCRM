using MediatR;
using SamanCRM.Core.Contracts.Facade;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.MeetingPlacesFeatures.Commands
{
    public class DeleteMeetingPlacesByIDCommand : IRequest<int>
    {
        public int Id { get; set; }
        public class DeleteMeetingPlacesByIDCommandHandler : IRequestHandler<DeleteMeetingPlacesByIDCommand, int>
        {
            private readonly IMeetingPlacesFacade meetingPlacesFacade;

            public DeleteMeetingPlacesByIDCommandHandler(IMeetingPlacesFacade meetingPlacesFacade)
            {
                this.meetingPlacesFacade = meetingPlacesFacade;
            }
            public Task<int> Handle(DeleteMeetingPlacesByIDCommand command, CancellationToken cancellationToken)
            {
                var meetingPlaces = meetingPlacesFacade.GetById(command.Id);
                meetingPlacesFacade.Remove(meetingPlaces);
                return Task.FromResult(command.Id);
            }
        }
    }
}
