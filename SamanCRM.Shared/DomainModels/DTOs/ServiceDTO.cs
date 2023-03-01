using System;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class ServiceDTO
    {
        public int ServiceID { get; set; }
        public Guid ServiceGuid { get; set; }
        public string Name { get; set; }
        public int Limitation { get; set; }
        public double Price { get; set; }
        public string MoneyUnit { get; set; }
        public string ServiceUnit { get; set; }
        public string Desc { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
