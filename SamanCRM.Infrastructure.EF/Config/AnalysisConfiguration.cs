using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class AnalysisConfiguration : IEntityTypeConfiguration<Analysis>
    {
        public void Configure(EntityTypeBuilder<Analysis> builder)
        {
            builder.ToTable("Tb-Analysis");
            builder.HasKey(a => a.AnalysisID);
            builder.HasIndex(a => new { a.AnalysisID, a.BranchID }).IsUnique();
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.AnalysisArea).HasColumnType("nvarchar(50)");
            builder.Property(a => a.User).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
