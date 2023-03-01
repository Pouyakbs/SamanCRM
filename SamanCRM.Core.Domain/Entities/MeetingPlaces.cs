using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class MeetingPlaces : BaseEntity<int>
    {
        public MeetingPlaces()
        {
            PlaceGuid = Guid.NewGuid();
        }
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
    }
}
