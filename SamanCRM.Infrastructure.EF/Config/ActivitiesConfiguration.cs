using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ActivitiesConfiguration : IEntityTypeConfiguration<Activities>
    {
        public void Configure(EntityTypeBuilder<Activities> builder)
        {
            builder.ToTable("Tb-Activities");
            builder.HasKey(a => a.ActivityID);
            builder.Property(a => a.ActivityType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.EntityType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne<ActivitiesDetail>(a => a.ActivitiesDetail).WithOne(a => a.Activities).HasForeignKey<ActivitiesDetail>(a => a.ActivityID);
            builder.HasOne(a => a.Personnel).WithMany(a => a.Activities).HasForeignKey(a => a.PersonnelID);
        }
    }
}
