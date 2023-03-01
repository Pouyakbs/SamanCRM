using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.MeetingPlacesFeatures.Queries
{
    public class GetMeetingPlacesByIdQuery : IRequest<MeetingPlacesDTO>
    {
        public int Id { get; set; }
        public class GetMeetingPlacesByIdQueryHandler : IRequestHandler<GetMeetingPlacesByIdQuery, MeetingPlacesDTO>
        {
            private readonly IMeetingPlacesFacade meetingPlacesFacade;

            public GetMeetingPlacesByIdQueryHandler(IMeetingPlacesFacade meetingPlacesFacade)
            {
                this.meetingPlacesFacade = meetingPlacesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<MeetingPlacesDTO> Handle(GetMeetingPlacesByIdQuery query, CancellationToken cancellationToken)
            {
                var meetingPlaces = meetingPlacesFacade.GetById(query.Id);
                if (meetingPlaces == null) return null;
                return meetingPlaces;
            }
        }
    }
}
