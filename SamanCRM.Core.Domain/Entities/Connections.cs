using SamanCRM.Core.Domain.Entities.Common;
using System;

namespace SamanCRM.Core.Domain.Entities
{
    public class Connections : BaseEntity<int>
    {
        public Connections()
        {
            ConnectionsGuid = Guid.NewGuid();
        }
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
    }
}
