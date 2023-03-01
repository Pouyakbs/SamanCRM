using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class CompetitorConfiguration : IEntityTypeConfiguration<Competitor>
    {
        public void Configure(EntityTypeBuilder<Competitor> builder)
        { 
            builder.ToTable("Tb-Competitor");
            builder.HasKey(a => a.CompetitorID);
            builder.HasIndex(a => new { a.CompetitorID, a.BranchID }).IsUnique();
            builder.Property(a => a.Name).HasColumnType("nvarchar(50)").IsRequired();
            builder.Property(a => a.CeoName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ContactFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CompAddress).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CompLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CompLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Website).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ActivityField).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ActivityExp).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProductFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Strengths).HasColumnType("nvarchar(max)");
            builder.Property(a => a.WeakPoints).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
