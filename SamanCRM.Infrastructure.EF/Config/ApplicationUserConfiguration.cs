using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.ToTable(name: "Tb-User");
            builder.HasKey(x => x.UserID);
            builder.Ignore(a => a.Email);
            builder.Ignore(a => a.EmailConfirmed);
            builder.Ignore(a => a.ConcurrencyStamp);
            builder.Ignore(a => a.NormalizedEmail);
            builder.Ignore(a => a.TwoFactorEnabled);
            builder.Ignore(a => a.PhoneNumber);
            builder.Ignore(a => a.PhoneNumberConfirmed);
            builder.Property(a => a.LockoutEnabled).HasColumnName("isDisabled");
            builder.Property(a => a.Id).HasColumnName("UserGuid");
            builder.Property(a => a.LockoutEnd).HasColumnName("DisabledEndTime");
            builder.Property(a => a.UserIP).HasColumnType("nvarchar(50)");
            builder.Property(a => a.PassActiveDays).HasColumnType("int");
            builder.Property(a => a.PassivePermitDays).HasColumnType("int");
            builder.Property(a => a.PassIncorrectNum).HasColumnType("int");
            builder.Property(a => a.PassExpiryTime).HasColumnType("datetime");
            builder.Property(a => a.PassiveExpiryTime).HasColumnType("datetime");
            builder.Property(a => a.PersonnelID).HasColumnType("int");
            builder.HasOne(a => a.Personnel).WithOne(a => a.ApplicationUser).HasForeignKey<Personnel>(a => a.UserID);
        }
    }
}
