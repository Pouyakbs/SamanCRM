using SamanCRM.Shared.DomainModels.DTOs;
using System.Collections.Generic;

namespace SamanCRM.Core.Contracts.Facade
{
    public interface IMeetingPlacesFacade
    {
        MeetingPlacesDTO GetById(int id);
        IEnumerable<MeetingPlacesDTO> GetAll();
        int Add(MeetingPlacesDTO entity);
        void Remove(MeetingPlacesDTO entity);
        void Update(MeetingPlacesDTO entity);
    }
}
