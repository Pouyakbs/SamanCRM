using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ArchiveConfiguration : IEntityTypeConfiguration<Archive>
    {
        public void Configure(EntityTypeBuilder<Archive> builder)
        {
            builder.ToTable("Tb-Archive");
            builder.HasKey(a => a.ArchiveID);
            builder.Property(a => a.EntityType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.FileFormat).HasColumnType("nvarchar(250)");
            builder.Property(a => a.FileName).HasColumnType("nvarchar(200)");
            builder.Property(a => a.RecordID).HasColumnType("int");
            builder.Property(a => a.File).HasColumnType("image");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
