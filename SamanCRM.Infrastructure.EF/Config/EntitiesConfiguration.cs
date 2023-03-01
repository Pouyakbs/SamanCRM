using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class EntitiesConfiguration : IEntityTypeConfiguration<Entities>
    {
        public void Configure(EntityTypeBuilder<Entities> builder)
        {
            builder.ToTable("Tb-Entities");
            builder.HasKey(a => a.EntitiesID);
            builder.HasIndex(a => new { a.EntitiesID, a.BranchID }).IsUnique();
            builder.Property(a => a.DisplayName).HasColumnType("nvarchar(70)");
            builder.Property(a => a.SystemName).HasColumnType("nvarchar(70)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");

        }
    }
}
