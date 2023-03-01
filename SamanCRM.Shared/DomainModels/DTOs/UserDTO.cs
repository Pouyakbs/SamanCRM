using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class UserDTO
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string NormalizedUsername { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public bool isRemoved { get; set; }
        public string UserIP { get; set; }
        public DateTime PassiveExpiryTime { get; set; }
        public DateTime PassExpiryTime { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public int PassActiveDays { get; set; }
        public int PassivePermitDays { get; set; }
        public int PassIncorrectNum { get; set; }
        public int PersonnelID { get; set; }
    }
}
