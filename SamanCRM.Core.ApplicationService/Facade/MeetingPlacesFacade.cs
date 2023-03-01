using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class MeetingPlacesFacade : IMeetingPlacesFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public MeetingPlacesFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(MeetingPlacesDTO entity)
        {
            MeetingPlaces meetingPlacesDTO = mapper.Map<MeetingPlacesDTO, MeetingPlaces>(entity);
            unitofWork.MeetingPlaces.Add(meetingPlacesDTO);
            unitofWork.Save();
            return meetingPlacesDTO.PlaceID;
        }

        public IEnumerable<MeetingPlacesDTO> GetAll()
        {
            IEnumerable<MeetingPlaces> meetingPlaces = unitofWork.MeetingPlaces.GetAll();
            IEnumerable<MeetingPlacesDTO> meetingPlacesDTO = mapper.Map<IEnumerable<MeetingPlaces>, IEnumerable<MeetingPlacesDTO>>(meetingPlaces);
            return meetingPlacesDTO;
        }

        public MeetingPlacesDTO GetById(int id)
        {
            MeetingPlaces meetingPlaces = unitofWork.MeetingPlaces.GetById(id);
            MeetingPlacesDTO meetingPlacesDTO = mapper.Map<MeetingPlaces, MeetingPlacesDTO>(meetingPlaces);
            return meetingPlacesDTO;
        }

        public void Remove(MeetingPlacesDTO entity)
        {
            MeetingPlaces meetingPlacesDTO = mapper.Map<MeetingPlacesDTO, MeetingPlaces>(entity);
            unitofWork.MeetingPlaces.Remove(meetingPlacesDTO);
            unitofWork.Save();
        }

        public void Update(MeetingPlacesDTO entity)
        {
            MeetingPlaces meetingPlacesDTO = mapper.Map<MeetingPlacesDTO, MeetingPlaces>(entity);
            MeetingPlacesDTO meetingPlaces = GetById(meetingPlacesDTO.PlaceID);
            meetingPlacesDTO.CreatedDate = meetingPlaces.CreatedDate;
            unitofWork.MeetingPlaces.Update(meetingPlacesDTO);
            unitofWork.Save();
        }
    }
}
