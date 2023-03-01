using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ActivitiesDTO
    {
        public int ActivityID { get; set; }
        public Guid ActivityGuid { get; set; }
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
        public DateTime CreatedDate { get; set; }
        public string Note { get; set; }
        public string Customer { get; set; }
        public string Priority { get; set; }
        public string GroupAnnounce { get; set; }
    }
}
