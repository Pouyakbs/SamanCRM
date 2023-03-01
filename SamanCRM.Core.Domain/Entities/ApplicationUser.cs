using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Core.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public int UserID { get; set; }
        public bool IsRemoved { get; set; }
        public string UserIP { get; set; }
        public string RefreshToken { get; set; }
        public DateTime PassExpiryTime { get; set; }
        public int PassActiveDays { get; set; }
        public DateTime PassiveExpiryTime { get; set; }
        public int PassivePermitDays { get; set; }
        public int PassIncorrectNum { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public int PersonnelID { get; set; }
        public Personnel Personnel { get; set; }
        public List<BranchUser> BranchUsers { get; set; }
        public List<Opportunities> Opportunities { get; set; }
    }
}
