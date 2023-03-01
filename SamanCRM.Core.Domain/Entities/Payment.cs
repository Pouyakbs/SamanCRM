using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Payment : BaseEntity<int>
    { 
        public Payment()
        {
            PaymentGuid = Guid.NewGuid();
        }
        public int PaymentID { get; set; }
        public Guid PaymentGuid { get; set; }
        public int RelatedTo { get; set; }
        public int RelatedToInput { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Associated { get; set; }
        public string Direction { get; set; }
        public DateTime ForecastedDate { get; set; }
        public string MoneyUnit { get; set; }
        public DateTime DoneDate { get; set; }
        public double Amount { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public string CustomerSMS { get; set; }
        public string Customer { get; set; }
        public string ReferenceNum { get; set; }
        public string PaymentCompany { get; set; }
        public string Branch { get; set; }
        public string Fund { get; set; }
        public string Assignedcount { get; set; }
        public string Remaincount { get; set; }
        public string Factor { get; set; }
        public string Desc { get; set; }
    }
}
