using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ComPublicTitlesConfiguration : IEntityTypeConfiguration<ComPublicTitles>
    {
        public void Configure(EntityTypeBuilder<ComPublicTitles> builder)
        {
            builder.ToTable("Tb-ComPublicTitles");
            builder.HasKey(a => a.TitleID);
            builder.HasIndex(a => new { a.TitleID, a.BranchID }).IsUnique();
            builder.Property(a => a.Title).HasColumnType("nvarchar(100)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.ProgramPart).WithMany(a => a.ComPublicTitles).HasForeignKey(a => a.ProgramPartID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
