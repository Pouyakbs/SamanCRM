using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Infrastructure.EF
{
    public class DemoContext : IdentityDbContext<ApplicationUser>
    {
        private readonly LogsContext logsContext;

        public DemoContext(DbContextOptions<DemoContext> dbContextOptions, LogsContext logsContext) : base(dbContextOptions)
        {
            this.logsContext = logsContext;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Clues> Clues { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Connections> Connections { get; set; }
        public DbSet<Opportunities> Opportunities { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Personnel> Personnels { get; set; }
        public DbSet<Target> Targets { get; set; }
        public DbSet<Competitor> Competitors { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<PreInvoice> PreInvoices { get; set; }
        public DbSet<SaleContract> SaleContracts { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Analysis> Analysis { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Confirmation> Confirmations { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<BuyOrder> BuyOrders { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ComPublic> ComPublics { get; set; }
        public DbSet<ComPublicTitles> ComPublicTitles { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRole { get; set; }
        public DbSet<Activities> Activities { get; set; }
        public DbSet<ActivitiesDetail> ActivitiesDetails { get; set; }
        public DbSet<PasswordComplexity> PasswordComplexity { get; set; }
        public DbSet<ProgramPart> ProgramPart { get; set; }
        public DbSet<Persons> Persons { get; set; }
        public DbSet<MeetingPlaces> MeetingPlaces { get; set; }
        public DbSet<Archive> Archives { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<ApplicationSettings> ApplicationSettings { get; set; }
        public virtual DbSet<PersonnelWithRoles> PersonnelWithRoles { get; set; }
        public virtual DbSet<Entities> Entities { get; set; }
        public virtual DbSet<SupportContract> SupportContract { get; set; }
        public override int SaveChanges()
        {
            var entries = this.ChangeTracker.Entries().ToList();
            foreach (var item in entries)
            {
                if (item.Metadata.ShortName() == "ApplicationUser")
                {
                    if (item.State == EntityState.Added)
                    {
                        UserLogs logs = new UserLogs()
                        {
                            Operation = "اضافه شد",
                            TableName = "User",
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.UserLogs.Add(logs);
                    }
                    else if (item.State == EntityState.Deleted)
                    {
                        UserLogs logs = new UserLogs()
                        {
                            Operation = "حذف شد",
                            TableName = "User",
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.UserLogs.Add(logs);
                    }
                    else if (item.State == EntityState.Modified)
                    {
                        UserLogs logs = new UserLogs()
                        {
                            Operation = "ویرایش شد",
                            TableName = "User",
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.UserLogs.Add(logs);
                    }
                }
                else if (item.Metadata.ShortName() == "ApplicationRole")
                {
                    if (item.State == EntityState.Added)
                    {
                        RolesLogs logs = new RolesLogs()
                        {
                            Operation = "اضافه شد",
                            TableName = "Roles",
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.RolesLogs.Add(logs);
                    }
                    else if (item.State == EntityState.Deleted)
                    {
                        RolesLogs logs = new RolesLogs()
                        {
                            Operation = "حذف شد",
                            TableName = "Roles",
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.RolesLogs.Add(logs);
                    }
                    else if (item.State == EntityState.Modified)
                    {
                        RolesLogs logs = new RolesLogs()
                        {
                            Operation = "ویرایش شد",
                            TableName = "Roles",
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.RolesLogs.Add(logs);
                    }
                }
                else
                {

                    if (item.State == EntityState.Added)
                    {
                        Logs logs = new Logs()
                        {
                            Operation = "اضافه شد",
                            TableName = item.Metadata.ShortName(),
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.Logs.Add(logs);
                    }
                    else if (item.State == EntityState.Deleted)
                    {
                        Logs logs = new Logs()
                        {
                            Operation = "حذف شد",
                            TableName = item.Metadata.ShortName(),
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.Logs.Add(logs);
                    }
                    else if (item.State == EntityState.Modified)
                    {
                        Logs logs = new Logs()
                        {
                            Operation = "ویرایش شد",
                            TableName = item.Metadata.ShortName(),
                            Data = JsonConvert.SerializeObject(item.Entity)
                        };
                        logsContext.Logs.Add(logs);
                    }
                }
                logsContext.SaveChanges();
            }
            return base.SaveChanges();
        }
    }
}
