using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class AccountConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.ToTable("Tb-Account");
            builder.HasKey(a => a.AccountID);
            builder.HasIndex(a => new { a.AccountID, a.BranchID }).IsUnique();
            builder.Property(a => a.AccountName).HasColumnType("nvarchar(25)");
            builder.Property(a => a.NickName).HasColumnType("nvarchar(15)");
            builder.Property(a => a.Name).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Surname).HasColumnType("nvarchar(30)");
            builder.Property(a => a.AccountType).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Address).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Attractiveness).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Blog).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SubNumber).HasColumnType("nvarchar(40)");
            builder.Property(a => a.RefferedBy).HasColumnType("nvarchar(40)");
            builder.Property(a => a.EcoCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(50)");
            builder.Property(a => a.State).HasColumnType("nvarchar(50)");
            builder.Property(a => a.City).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ExpireTime).HasColumnType("datetime");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(35)");
            builder.Property(a => a.Instagram).HasColumnType("nvarchar(max)");
            builder.Property(a => a.LinkedIn).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Twitter).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.GeographyCode).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Latitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherGeographicalArea).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherCountry).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Otherstate).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Othercity).HasColumnType("nvarchar(50)");
            builder.Property(a => a.OtherPostalCode).HasColumnType("nvarchar(35)");
            builder.Property(a => a.Otheraddress).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Otherlatitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Otherlongitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Longitude).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Industry).HasColumnType("nvarchar(60)");
            builder.Property(a => a.Member).HasColumnType("nvarchar(50)");
            builder.Property(a => a.NationalNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ContactFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Emails).HasColumnType("nvarchar(max)");
            builder.Property(a => a.SaleDiscount).HasColumnType("float(53)");
            builder.Property(a => a.User).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ValidityLimit).HasColumnType("nvarchar(20)");
            builder.Property(a => a.ValiditySource).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ValiditySourceDesc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ValidityStatus).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ValidityType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Website).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Fax).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Facebook).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne<Supplier>(a => a.Supplier).WithOne(a => a.Account).HasForeignKey<Supplier>(a => a.AccountID);
        }
    }
}
