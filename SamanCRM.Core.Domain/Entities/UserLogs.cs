using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class UserLogs
    {
        public UserLogs()
        {
            Id = Guid.NewGuid();
            InsertDate = DateTime.Now;
        }
        public int LogID { get; set; }
        public Guid Id { get; set; }
        public string TableName { get; set; }
        public string Operation { get; set; }
        public string Data { get; set; }
        public DateTime InsertDate { get; set; }
    }

}
