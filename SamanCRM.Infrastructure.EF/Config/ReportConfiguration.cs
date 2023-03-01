using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ReportConfiguration : IEntityTypeConfiguration<Report>
    {
        public void Configure(EntityTypeBuilder<Report> builder)
        {
            builder.ToTable("Tb-Report");
            builder.HasKey(a => a.ReportID);
            builder.HasIndex(a => new { a.ReportID, a.BranchID }).IsUnique();
            builder.Property(a => a.ReportName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ReportModule).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ReportRange).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ReportFormat).HasColumnType("nvarchar(15)");
            builder.Property(a => a.Display).HasColumnType("nvarchar(25)");
            builder.Property(a => a.InternalDesc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.PublicDesc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.AuditTable).HasColumnType("nvarchar(5)");
            builder.Property(a => a.User).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
