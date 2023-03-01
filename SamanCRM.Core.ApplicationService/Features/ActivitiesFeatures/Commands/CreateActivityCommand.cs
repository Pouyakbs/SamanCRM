using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ActivitiesFeatures.Commands
{
    public class CreateActivityCommand : IRequest<int>
    {
        public string EntityType { get; set; }
        public string ActivityType { get; set; }
        public int PersonnelID { get; set; }
        public string Subject { get; set; }
        public int RelatedTo { get; set; }
        public int RelatedToInput { get; set; }
        public string PhoneNumber { get; set; }
        public string InternalNum { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Duration { get; set; }
        public string Meetinglocation { get; set; }
        public string UserSMS { get; set; }
        public string GuestsSMS { get; set; }
        public string SoftwareReminder { get; set; }
        public string Desc { get; set; }
        public bool SendInvitation { get; set; }
        public string GuestFullName { get; set; }
        public string Email { get; set; }
        public string MeetingPlace { get; set; }
        public string Deadline { get; set; }
        public string StartTime { get; set; }
        public List<string> NoteFile { get; set; }
        public string Note { get; set; }
        public string Customer { get; set; }
        public string Priority { get; set; }
        public string GroupAnnounce { get; set; }
        public class CreateActivityCommandHandler : IRequestHandler<CreateActivityCommand, int>
        {
            private readonly IActivitiesFacade activitiesFacade;

            public CreateActivityCommandHandler(IActivitiesFacade activitiesFacade)
            {
                this.activitiesFacade = activitiesFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateActivityCommand command, CancellationToken cancellationToken)
            {
                var activitiesDTO = new ActivitiesDTO();
                activitiesDTO.ActivityType = command.ActivityType;
                activitiesDTO.PersonnelID = command.PersonnelID;
                activitiesDTO.SendInvitation = command.SendInvitation;
                activitiesDTO.SoftwareReminder = command.SoftwareReminder;
                activitiesDTO.Deadline = command.Deadline;
                activitiesDTO.Desc = command.Desc;
                activitiesDTO.Note = command.Note;
                activitiesDTO.NoteFile = command.NoteFile;
                activitiesDTO.Customer = command.Customer;
                activitiesDTO.Date = command.Date;
                activitiesDTO.Email = command.Email;
                activitiesDTO.EntityType = command.EntityType;
                activitiesDTO.GroupAnnounce = command.GroupAnnounce;
                activitiesDTO.GuestFullName = command.GuestFullName;
                activitiesDTO.GuestsSMS = command.GuestsSMS;
                activitiesDTO.MeetingPlace = command.MeetingPlace;
                activitiesDTO.Priority = command.Priority;
                activitiesDTO.RelatedTo = command.RelatedTo;
                activitiesDTO.RelatedToInput = command.RelatedToInput;
                activitiesDTO.PhoneNumber = command.PhoneNumber;
                activitiesDTO.InternalNum = command.InternalNum;
                activitiesDTO.SendInvitation = command.SendInvitation;
                activitiesDTO.StartTime = command.StartTime;
                activitiesDTO.Status = command.Status;
                activitiesDTO.Subject = command.Subject;
                activitiesDTO.Type = command.Type;
                activitiesDTO.Time = command.Time;
                activitiesDTO.Duration = command.Duration;
                activitiesDTO.Meetinglocation = command.Meetinglocation;
                activitiesDTO.UserSMS = command.UserSMS;
                activitiesDTO.CreatedDate = DateTime.Now;
                activitiesDTO.ActivityGuid = Guid.NewGuid();
                activitiesFacade.Add(activitiesDTO);
                return activitiesDTO.ActivityID;
            }
        }
    }
}
