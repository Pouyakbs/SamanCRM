using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class RoleProgramPartConfiguration : IEntityTypeConfiguration<RoleProgramPart>
    {
        public void Configure(EntityTypeBuilder<RoleProgramPart> builder)
        {
            builder.ToTable("Tb-RoleProgramPart");
            builder.HasKey(a => new { a.ProgramPartID, a.RoleID });
            builder.HasOne(a => a.ProgramPart).WithMany(a => a.RoleProgramParts).HasForeignKey(a => a.ProgramPartID);
            builder.HasOne(a => a.ApplicationRole).WithMany(a => a.RoleProgramParts).HasForeignKey(a => a.RoleID);
        }
    }
}
