using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PersonnelConfiguration : IEntityTypeConfiguration<Personnel>
    {
        public void Configure(EntityTypeBuilder<Personnel> builder)
        {
            builder.ToTable("Tb-Personnel");
            builder.HasKey(a => a.PersonnelID);
            builder.HasIndex(a => new { a.PersonnelID, a.BranchID }).IsUnique();
            builder.Property(a => a.InternalNum).HasColumnType("nvarchar(13)");
            builder.Property(a => a.Email).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Username).HasColumnType("nvarchar(20)");
            builder.Property(a => a.contactFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ManagerName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BirthDate).HasColumnType("date");
            builder.Property(a => a.WorkingUnit).HasColumnType("nvarchar(60)");
            builder.Property(a => a.NationalCode).HasColumnType("nvarchar(25)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(30)");
            builder.Property(a => a.GeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(30)");
            builder.Property(a => a.State).HasColumnType("nvarchar(40)");
            builder.Property(a => a.City).HasColumnType("nvarchar(40)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(35)");
            builder.Property(a => a.Address).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Latitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Longitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.UserID).HasColumnType("int");
            builder.HasOne(a => a.ApplicationUser).WithOne(a => a.Personnel).HasForeignKey<ApplicationUser>(a => a.PersonnelID);

        }
    }
}
