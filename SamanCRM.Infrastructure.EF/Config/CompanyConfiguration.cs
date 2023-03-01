using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.ToTable("Tb-Company");
            builder.HasKey(a => a.CompanyID);
            builder.HasIndex(a => new { a.CompanyID, a.BranchID }).IsUnique();
            builder.Property(a => a.CompanyName).HasColumnType("nvarchar(40)").IsRequired();
            builder.Property(a => a.CompanyTitle).HasColumnType("nvarchar(40)").IsRequired();
            builder.Property(a => a.SubNumber).HasColumnType("nvarchar(30)");
            builder.Property(a => a.EcoCode).HasColumnType("nvarchar(25)");
            builder.Property(a => a.NationalNum).HasColumnType("nvarchar(25)");
            builder.Property(a => a.State).HasColumnType("nvarchar(35)");
            builder.Property(a => a.City).HasColumnType("nvarchar(35)");
            builder.Property(a => a.Address).HasColumnType("nvarchar(max)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(25)");
            builder.Property(a => a.OfficePhone).HasColumnType("nvarchar(13)");
            builder.Property(a => a.Fax).HasColumnType("nvarchar(13)");
            builder.Property(a => a.BankAccNum).HasColumnType("nvarchar(50)");
            builder.Property(a => a.BankCardNum).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ShebaNum).HasColumnType("nvarchar(50)");
            builder.Property(a => a.BankName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.AccountOwner).HasColumnType("nvarchar(35)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");

        }
    }
}
