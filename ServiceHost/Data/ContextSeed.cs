using Microsoft.AspNetCore.Identity;
using SamanCRM.Core.Domain.Entities;
using ServiceHost.Models;
using System.Threading.Tasks;

namespace ServiceHost.Data
{
    public static class ContextSeed
    {
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            //Seed Roles
            await roleManager.CreateAsync(new IdentityRole(Roles.مدیرعامل.ToString()));
            await roleManager.CreateAsync(new IdentityRole(Roles.کاربر.ToString()));
        }
    }
}
