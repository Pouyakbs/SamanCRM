using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.MeetingPlacesFeatures.Commands
{
    public class CreateMeetingPlacesCommand : IRequest<int>
    {
        public string PlaceName { get; set; }
        public int RoomCapacity { get; set; }
        public bool LapTop { get; set; }
        public bool Monitor { get; set; }
        public bool Internet { get; set; }
        public bool Network { get; set; }
        public bool MicroPhone { get; set; }
        public bool Projector { get; set; }
        public bool WhiteBoard { get; set; }
        public bool CoolingAndHeating { get; set; }
        public string Desc { get; set; }
        public class CreateMeetingPlacesCommandHandler : IRequestHandler<CreateMeetingPlacesCommand, int>
        {
            private readonly IMeetingPlacesFacade meetingPlacesFacade;

            public CreateMeetingPlacesCommandHandler(IMeetingPlacesFacade meetingPlacesFacade)
            {
                this.meetingPlacesFacade = meetingPlacesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateMeetingPlacesCommand command, CancellationToken cancellationToken)
            {
                var meetingPlacesDTO = new MeetingPlacesDTO();
                meetingPlacesDTO.RoomCapacity = command.RoomCapacity;
                meetingPlacesDTO.PlaceName = command.PlaceName;
                meetingPlacesDTO.Desc = command.Desc;
                meetingPlacesDTO.Internet = command.Internet;
                meetingPlacesDTO.Network = command.Network;
                meetingPlacesDTO.Monitor = command.Monitor;
                meetingPlacesDTO.LapTop = command.LapTop;
                meetingPlacesDTO.MicroPhone = command.MicroPhone;
                meetingPlacesDTO.Projector = command.Projector;
                meetingPlacesDTO.WhiteBoard = command.WhiteBoard;
                meetingPlacesDTO.CoolingAndHeating = command.CoolingAndHeating;
                meetingPlacesDTO.CreatedDate = DateTime.Now;
                meetingPlacesDTO.PlaceGuid = Guid.NewGuid();
                meetingPlacesFacade.Add(meetingPlacesDTO);
                return meetingPlacesDTO.PlaceID;
            }
        }
    }
}
