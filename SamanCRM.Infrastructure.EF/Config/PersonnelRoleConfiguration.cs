using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PersonnelRoleConfiguration : IEntityTypeConfiguration<PersonnelRole>
    {
        public void Configure(EntityTypeBuilder<PersonnelRole> builder)
        {
            builder.ToTable("Tb-PersonnelRole");
            builder.HasKey(a => new { a.PersonnelID, a.RoleID });
            builder.HasOne(a => a.Personnel).WithMany(a => a.PersonnelRole).HasForeignKey(a => a.PersonnelID);
            builder.HasOne(a => a.ApplicationRole).WithMany(a => a.PersonnelRole).HasForeignKey(a => a.RoleID);
        }
    }
}
