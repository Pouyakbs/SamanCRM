using SamanCRM.Core.Domain.Entities.Common;
using System;

namespace SamanCRM.Core.Domain.Entities
{
    public class Confirmation : BaseEntity<int>
    {
        public Confirmation()
        {
            ConfirmationGuid = Guid.NewGuid();
        }
        public int ConfirmationID { get; set; }
        public Guid ConfirmationGuid { get; set; }
        public string Name { get; set; }
        public string ParentName { get; set; }
        public string ApprovalModel { get; set; }
        public string Status { get; set; }
        public string ApprovalType { get; set; }
        public string ConfirmLevel { get; set; }
        public string Seconder { get; set; }
        public string Desc { get; set; }
    }
}
