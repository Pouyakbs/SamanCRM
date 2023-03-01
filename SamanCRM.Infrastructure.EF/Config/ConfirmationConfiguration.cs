using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ConfirmationConfiguration : IEntityTypeConfiguration<Confirmation>
    {
        public void Configure(EntityTypeBuilder<Confirmation> builder)
        {
            builder.ToTable("Tb-Confirmation");
            builder.HasKey(a => a.ConfirmationID);
            builder.HasIndex(a => new { a.ConfirmationID, a.BranchID }).IsUnique();
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ParentName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Seconder).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ApprovalModel).HasColumnType("nvarchar(60)");
            builder.Property(a => a.ApprovalType).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ConfirmLevel).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
