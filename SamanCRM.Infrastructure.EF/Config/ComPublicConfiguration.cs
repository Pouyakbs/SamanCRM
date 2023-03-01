using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ComPublicConfiguration : IEntityTypeConfiguration<ComPublic>
    {
        public void Configure(EntityTypeBuilder<ComPublic> builder)
        {
            builder.ToTable("Tb-ComPublic");
            builder.HasKey(a => a.ComPublicID);
            builder.HasIndex(a => new { a.ComPublicID, a.BranchID }).IsUnique();
            builder.Property(a => a.Title).HasColumnType("nvarchar(100)");
            builder.Property(a => a.ParentID).HasColumnType("int");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.ProgramPart).WithMany(a => a.ComPublics).HasForeignKey(a => a.ProgramPartID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(a => a.ComPublicTitles).WithMany(a => a.ComPublics).HasForeignKey(a => a.ComPublicTitleID);
        }
    }
}
