using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ProgramPartConfiguration : IEntityTypeConfiguration<ProgramPart>
    {
        public void Configure(EntityTypeBuilder<ProgramPart> builder)
        {
            builder.ToTable("Tb-ProgramPart");
            builder.HasKey(a => a.ID);
            builder.Property(a => a.ParentID).HasColumnType("int").IsRequired();
            builder.Property(a => a.SystemName).HasColumnType("nvarchar(300)");
            builder.Property(a => a.DisplayName).HasColumnType("nvarchar(120)");
            builder.Property(a => a.Priority).HasColumnType("int").IsRequired();
            builder.Property(a => a.Active).HasColumnType("bit").IsRequired();
            builder.Property(a => a.Icon).HasColumnType("nvarchar(100)");
            builder.Property(a => a.Type).HasColumnType("nvarchar(50)");
            builder.Property(a => a.RouteName).HasColumnType("nvarchar(max)");
        }
    }
}
