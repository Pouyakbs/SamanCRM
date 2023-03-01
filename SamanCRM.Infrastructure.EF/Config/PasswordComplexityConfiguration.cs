using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PasswordComplexityConfiguration : IEntityTypeConfiguration<PasswordComplexity>
    {
        public void Configure(EntityTypeBuilder<PasswordComplexity> builder)
        {
            builder.ToTable("Tb-PasswordComplexity");
            builder.HasKey(a => a.PasswordComplexityID);
            builder.Property(a => a.PassMaxChar).HasColumnType("int");
            builder.Property(a => a.PassLeastChar).HasColumnType("int");
            builder.Property(a => a.SpecialChar).HasColumnType("nchar(5)");
            builder.Property(a => a.UseChar).HasColumnType("nchar(5)");
            builder.Property(a => a.UseDigit).HasColumnType("nchar(5)");
            builder.Property(a => a.UseSpecialChar).HasColumnType("nchar(5)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
