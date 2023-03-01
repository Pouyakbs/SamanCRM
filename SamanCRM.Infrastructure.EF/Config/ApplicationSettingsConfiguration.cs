using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ApplicationSettingsConfiguration : IEntityTypeConfiguration<ApplicationSettings>
    {
        public void Configure(EntityTypeBuilder<ApplicationSettings> builder)
        {
            builder.ToTable("Tb-ApplicationSettings");
            builder.HasKey(a => a.SettingID);
            builder.Property(a => a.VariableName).HasColumnType("nvarchar(80)");
            builder.Property(a => a.Value).HasColumnType("nvarchar(100)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Personnel).WithMany(a => a.ApplicationSettings).HasForeignKey(a => a.PersonnelID);
        }
    }
}
