using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Infrastructure.EF
{
    public class LogsContext : DbContext
    {
        public LogsContext(DbContextOptions<LogsContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Logs>(builder =>
            {
                builder.HasKey(a => a.LogID);
                builder.Property(a => a.TableName);
                builder.Property(a => a.Operation);
                builder.Property(a => a.Data);
                builder.Property(a => a.InsertDate).HasColumnType("datetime").IsRequired();
            });
            builder.Entity<UserLogs>(builder =>
            {
                builder.HasKey(a => a.LogID);
                builder.Property(a => a.TableName);
                builder.Property(a => a.Operation);
                builder.Property(a => a.Data);
                builder.Property(a => a.InsertDate).HasColumnType("datetime").IsRequired();
            });
            builder.Entity<RolesLogs>(builder =>
            {
                builder.HasKey(a => a.LogID);
                builder.Property(a => a.TableName);
                builder.Property(a => a.Operation);
                builder.Property(a => a.Data);
                builder.Property(a => a.InsertDate).HasColumnType("datetime").IsRequired();
            });

        }
        public DbSet<Logs> Logs { get; set; }
        public DbSet<UserLogs> UserLogs { get; set; }
        public DbSet<RolesLogs> RolesLogs { get; set; }
    }
}
