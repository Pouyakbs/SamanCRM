using SamanCRM.Core.Domain.Entities.Common;

namespace SamanCRM.Core.Domain.Entities
{
    public class Service : BaseEntity<int>
    {
        public int ServiceID { get; set; }
        public string Name { get; set; }
        public int Limitation { get; set; }
        public double Price { get; set; }
        public string MoneyUnit { get; set; }
        public string ServiceUnit { get; set; }
        public string Desc { get; set; }
    }
}
