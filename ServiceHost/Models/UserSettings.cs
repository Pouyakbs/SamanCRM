using System.ComponentModel.DataAnnotations;

namespace ServiceHost.Models
{
    public class UserSettings
    {
        public string Username { get; set; }
        public int PassActiveDays { get; set; }
        public int PassIncorrectNum { get; set; }
        public int PassivePermitDays { get; set; }
        public bool ChangeForAll { get; set; }
    }
}
