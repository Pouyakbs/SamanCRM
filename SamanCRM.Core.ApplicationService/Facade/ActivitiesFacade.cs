using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ActivitiesFacade : IActivitiesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ActivitiesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ActivitiesDTO entity)
        {
            Activities activitiesDTO = mapper.Map<ActivitiesDTO, Activities>(entity);
            List<Archive> archive = new List<Archive>();
            ActivitiesDetail activityDetail = mapper.Map<ActivitiesDTO, ActivitiesDetail>(entity);
            activitiesDTO.ActivitiesDetail = activityDetail;
            activitiesDTO.ActivityType = activitiesDTO.EntityType;
            activitiesDTO.ActivitiesDetail.CreatedDate = System.DateTime.Now;
            activitiesDTO.ActivitiesDetail.ModifiedDate = System.DateTime.Now;
            unitofWork.Activities.Add(activitiesDTO);
            unitofWork.Save();
            // Add Files
            foreach (var item in entity.NoteFile)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = activitiesDTO.ActivityID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "Notes" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.AddRange(archive);
            unitofWork.Save();
            return activitiesDTO.ActivityID;
        }

        public IEnumerable<ActivitiesDetail> GetAll(string entityType)
        {
            IEnumerable<Activities> activities = unitofWork.Activities.GetAllActivities(entityType);
            List<ActivitiesDetail> activitiesDetail = new List<ActivitiesDetail>();
            foreach (var item in activities)
            {
                activitiesDetail.Add(item.ActivitiesDetail);
            }
            return activitiesDetail;
        }
        public IEnumerable<ActivitiesDetail> GetByPersonnel(string entityType , int personnelID)
        {
            IEnumerable<Activities> activities = unitofWork.Activities.GetActivityByPersonnel(entityType , personnelID);
            List<ActivitiesDetail> activitiesDetail = new List<ActivitiesDetail>();
            foreach (var item in activities)
            {
                activitiesDetail.Add(item.ActivitiesDetail);
            }
            return activitiesDetail;
        }

        public ActivitiesDTO GetById(int id)
        {
            Activities activities = unitofWork.Activities.GetActivityByID(id);
            List<Archive> archive = unitofWork.Archive.GetArchiveByRecordID(id);
            List<string> files = new List<string>();
            // Get Files by ID
            foreach (var item in archive)
            {
                if (item.EntityType == "Notes")
                {
                    string rawPic = Convert.ToBase64String(item.File);
                    string file = "FileName:" + item.FileName + ",data:" + item.FileFormat + ";base64," + rawPic;
                    files.Add(file);
                }
            }
            ActivitiesDTO activitiesDTO = mapper.Map<Activities, ActivitiesDTO>(activities);
            activitiesDTO.GroupAnnounce = activities.ActivitiesDetail.GroupAnnounce;
            activitiesDTO.Duration = activities.ActivitiesDetail.Duration;
            activitiesDTO.Meetinglocation = activities.ActivitiesDetail.Meetinglocation;
            activitiesDTO.Customer = activities.ActivitiesDetail.Customer;
            activitiesDTO.Date = activities.ActivitiesDetail.Date;
            activitiesDTO.Deadline = activities.ActivitiesDetail.Deadline;
            activitiesDTO.Desc = activities.ActivitiesDetail.Desc;
            activitiesDTO.Email = activities.ActivitiesDetail.Email;
            activitiesDTO.GuestFullName = activities.ActivitiesDetail.GuestFullName;
            activitiesDTO.GuestsSMS = activities.ActivitiesDetail.GuestsSMS;
            activitiesDTO.InternalNum = activities.ActivitiesDetail.InternalNum;
            activitiesDTO.MeetingPlace = activities.ActivitiesDetail.MeetingPlace;
            activitiesDTO.Note = activities.ActivitiesDetail.Note;
            activitiesDTO.PhoneNumber = activities.ActivitiesDetail.PhoneNumber;
            activitiesDTO.Priority = activities.ActivitiesDetail.Priority;
            activitiesDTO.RelatedTo = activities.ActivitiesDetail.RelatedTo;
            activitiesDTO.RelatedToInput = activities.ActivitiesDetail.RelatedToInput;
            activitiesDTO.SendInvitation = activities.ActivitiesDetail.SendInvitation;
            activitiesDTO.SoftwareReminder = activities.ActivitiesDetail.SoftwareReminder;
            activitiesDTO.StartTime = activities.ActivitiesDetail.StartTime;
            activitiesDTO.Status = activities.ActivitiesDetail.Status;
            activitiesDTO.Subject = activities.ActivitiesDetail.Subject;
            activitiesDTO.Time = activities.ActivitiesDetail.Time;
            activitiesDTO.Type = activities.ActivitiesDetail.Type;
            activitiesDTO.ActivityID = activities.ActivitiesDetail.ActivityID;
            activitiesDTO.UserSMS = activities.ActivitiesDetail.UserSMS;
            activitiesDTO.NoteFile = files;
            return activitiesDTO;
        }

        public void Remove(ActivitiesDTO entity)
        {
            Activities activitiesDTO = mapper.Map<ActivitiesDTO, Activities>(entity);
            unitofWork.Activities.Remove(activitiesDTO);
            unitofWork.Save();
        }

        public void Update(ActivitiesDTO entity)
        {
            Activities activitiesDTO = mapper.Map<ActivitiesDTO, Activities>(entity);
            List<Archive> archive = new List<Archive>();
            ActivitiesDetail activityDetail = mapper.Map<ActivitiesDTO, ActivitiesDetail>(entity);
            activitiesDTO.ActivitiesDetail = activityDetail;
            activitiesDTO.ActivityType = activitiesDTO.EntityType;
            activitiesDTO.ActivitiesDetail.ModifiedDate = System.DateTime.Now;
            ActivitiesDTO activities = GetById(activitiesDTO.ActivityID);
            activitiesDTO.CreatedDate = activities.CreatedDate;
            activitiesDTO.ActivitiesDetail.CreatedDate = activities.CreatedDate;
            activitiesDTO.ActivitiesDetail.ActivityGuid = activities.ActivityGuid;
            activitiesDTO.ActivityGuid = activities.ActivityGuid;
            unitofWork.Activities.Update(activitiesDTO);
            unitofWork.Save();
            // Update Files
            foreach (var item in entity.NoteFile)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = activitiesDTO.ActivityID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "Notes" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.UpdateRange(archive);
            unitofWork.Save();
        }
    }
}
