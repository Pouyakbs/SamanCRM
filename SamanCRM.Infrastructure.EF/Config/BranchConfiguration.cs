using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class BranchConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.ToTable("Tb-Branch");
            builder.HasKey(a => a.BranchID);
            builder.Property(a => a.BranchName).HasColumnType("nvarchar(20)").IsRequired();
            builder.Property(a => a.BranchAddress).HasColumnType("nvarchar(max)").IsRequired();
            builder.Property(a => a.BranchPhoneNum).HasColumnType("nvarchar(13)").IsRequired();
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");

        }
    }
}
