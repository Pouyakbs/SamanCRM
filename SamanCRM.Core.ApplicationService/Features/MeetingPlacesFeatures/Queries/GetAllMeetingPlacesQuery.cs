using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.MeetingPlacesFeatures.Queries
{
    public class GetAllMeetingPlacesQuery : IRequest<IEnumerable<MeetingPlacesDTO>>
    {
        public class GetAllMeetingPlacesQueryHandler : IRequestHandler<GetAllMeetingPlacesQuery, IEnumerable<MeetingPlacesDTO>>
        {
            private readonly IMeetingPlacesFacade meetingPlacesFacade;

            public GetAllMeetingPlacesQueryHandler(IMeetingPlacesFacade meetingPlacesFacade)
            {
                this.meetingPlacesFacade = meetingPlacesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<IEnumerable<MeetingPlacesDTO>> Handle(GetAllMeetingPlacesQuery query, CancellationToken cancellationToken)
            {
                var meetingPlaces = meetingPlacesFacade.GetAll().ToList();
                if (meetingPlaces == null)
                {
                    return null;
                }
                return meetingPlaces.AsReadOnly();
            }
        }
    }
}
