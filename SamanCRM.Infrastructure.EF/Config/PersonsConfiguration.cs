using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PersonsConfiguration : IEntityTypeConfiguration<Persons>
    {
        public void Configure(EntityTypeBuilder<Persons> builder)
        {
            builder.ToTable("Tb-Persons");
            builder.HasKey(a => a.PersonID);
            builder.HasIndex(a => new { a.PersonID, a.BranchID }).IsUnique();
            builder.Property(a => a.PersonName).HasColumnType("nvarchar(30)").IsRequired();
            builder.Property(a => a.Surname).HasColumnType("nvarchar(30)").IsRequired();
            builder.Property(a => a.Segment).HasColumnType("nvarchar(25)");
            builder.Property(a => a.AccountName).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ClueSource).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ContactFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Email).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Section).HasColumnType("nvarchar(13)");
            builder.Property(a => a.Username).HasColumnType("nvarchar(20)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ManagerName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SecretaryName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BirthDate).HasColumnType("date");
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
            builder.Property(a => a.OtherGeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherCountry).HasColumnType("nvarchar(30)");
            builder.Property(a => a.OtherState).HasColumnType("nvarchar(40)");
            builder.Property(a => a.OtherCity).HasColumnType("nvarchar(40)");
            builder.Property(a => a.OtherPostalCode).HasColumnType("nvarchar(35)");
            builder.Property(a => a.OtherAddress).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherLatitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherLongitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Instagram).HasColumnType("nvarchar(max)");
            builder.Property(a => a.LinkedIn).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Twitter).HasColumnType("nvarchar(max)");
            builder.Property(a => a.FaceBook).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Blog).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Account).WithMany(a => a.Persons).HasForeignKey(a => a.AccountID);
            builder.HasOne(a => a.PreInvoice).WithOne(a => a.Persons).HasForeignKey<PreInvoice>(a => a.PersonsID);
            builder.HasOne(a => a.Invoice).WithOne(a => a.Persons).HasForeignKey<Invoice>(a => a.PersonsID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(a => a.PreInvoice).WithOne(a => a.Persons).HasForeignKey<PreInvoice>(a => a.PersonsID).OnDelete(DeleteBehavior.NoAction);

        }
    }
}
