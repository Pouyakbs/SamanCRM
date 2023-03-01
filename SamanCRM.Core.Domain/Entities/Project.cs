using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Project : BaseEntity<int>
    {
        public Project()
        {
            ProjectGuid = Guid.NewGuid();
        }
        public int ProjectID { get; set; }
        public Guid ProjectGuid { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ProjectType { get; set; }
        public string Importance { get; set; }
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
        public string Desc { get; set; }
        public string Log { get; set; }
        public int AccountID { get; set; }
        public Account Account { get; set; }
        public int ClueID { get; set; }
        public Clues Clues { get; set; }
        public List<PreInvoice> PreInvoices { get; set; }
        public List<Invoice> Invoices { get; set; }
    }
}
