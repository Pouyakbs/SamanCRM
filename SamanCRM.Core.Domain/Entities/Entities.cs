using SamanCRM.Core.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class Entities : BaseEntity<int>
    {
        public int EntitiesID { get; set; }
        public string SystemName { get; set; }
        public string DisplayName { get; set; }
    }
}
