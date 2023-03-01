using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Models;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PersonnelWithRolesConfiguration : IEntityTypeConfiguration<PersonnelWithRoles>
    {
        public void Configure(EntityTypeBuilder<PersonnelWithRoles> builder)
        {
            builder.HasNoKey();

            builder.ToView("PersonnelWithRoles");

            builder.Property(e => e.ParentId).HasColumnName("ParentID");

            builder.Property(e => e.PersonnelId).HasColumnName("PersonnelID");

            builder.Property(e => e.RoleId).HasColumnName("RoleID");

            builder.Property(e => e.RoleName).HasMaxLength(40);

            builder.Property(e => e.WorkingUnit).HasMaxLength(60);
        }
    }
}
