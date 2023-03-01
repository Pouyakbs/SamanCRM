using System.Collections.Generic;

namespace ServiceHost.Models
{
    public class UserRolesViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool IsRemoved { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
