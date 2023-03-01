using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ProjectDTO
    {
        public int ProjectID { get; set; }
        public Guid ProjectGuid { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ProjectType { get; set; }
        public string Importance { get; set; }
        public string MainAcc { get; set; }
        public string User { get; set; }
        public string MainSendGeoLoc { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string MainAddress { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string AccountantNum { get; set; }
        public string Clue { get; set; }
        public string Desc { get; set; }
        public string Log { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
