using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ConnectionsDTO
    {
        public int ConnectionsID { get; set; }
        public Guid ConnectionsGuid { get; set; }
        public string Title { get; set; }
        public bool ActiveConnection { get; set; }
        public string MaduleName { get; set; }
        public string RecordType { get; set; }
        public string Condition { get; set; }
        public string ConditionAmount { get; set; }
        public bool SendMessage { get; set; }
        public bool SendEmail { get; set; }
        public string MessageTitle { get; set; }
        public string EmailTitle { get; set; }
        public string Frame { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
