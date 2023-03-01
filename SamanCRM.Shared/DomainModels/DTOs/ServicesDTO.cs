using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ServicesDTO
    {
        public int ServiceID { get; set; }
        public Guid ServiceGuid { get; set; }
        public string Subject { get; set; }
        public string ServiceNum { get; set; }
        public string Desc { get; set; }
        public string Status { get; set; }
        public string TeamName { get; set; }
        public string ServiceType { get; set; }
        public string FirstLayerUser { get; set; }
        public string SecondLayerUser { get; set; }
        public string CustomerReason { get; set; }
        public string ServiceReason { get; set; }
        public string Priority { get; set; }
        public string Intensity { get; set; }
        public string AnnounceChannel { get; set; }
        public string Category { get; set; }
        public DateTime ReceiveDate { get; set; }
        public string Time { get; set; }
        public string InstallLoc { get; set; }
        public string DeviceLoc { get; set; }
        public string DeviceLocInput { get; set; }
        public string GeographyLoc { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Address { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string FileTitle { get; set; }
        public byte[] Files { get; set; }
        public string InternalDesc { get; set; }
        public string Solution { get; set; }
        public int PersonsID { get; set; }
        public int AccountID { get; set; }
        public List<string> ProductFields { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
