using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class MeetingPlacesDTO
    {
        public int PlaceID { get; set; }
        public Guid PlaceGuid { get; set; }
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
        public DateTime CreatedDate { get; set; }
    }

}
