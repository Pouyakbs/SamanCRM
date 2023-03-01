using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class TargetConfiguration : IEntityTypeConfiguration<Target>
    {
        public void Configure(EntityTypeBuilder<Target> builder)
        {
            builder.ToTable("Tb-Target");
            builder.HasKey(a => a.TargetID);
            builder.HasIndex(a => new { a.TargetID, a.BranchID }).IsUnique();
            builder.Property(a => a.AccountName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.BirthDate).HasColumnType("datetime");
            builder.Property(a => a.CallMe).HasColumnType("nvarchar(5)");
            builder.Property(a => a.City).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Email).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Fax).HasColumnType("nvarchar(30)");
            builder.Property(a => a.GeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.HomeNum).HasColumnType("nvarchar(13)");
            builder.Property(a => a.Lat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Long).HasColumnType("nvarchar(max)");
            builder.Property(a => a.MainAddress).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.OfficePhone).HasColumnType("nvarchar(13)");
            builder.Property(a => a.OtherPhoneNum).HasColumnType("nvarchar(13)");
            builder.Property(a => a.PhoneNum).HasColumnType("nvarchar(13)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.SecretaryName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.State).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Surname).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Title).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Unit).HasColumnType("nvarchar(30)");
            builder.Property(a => a.User).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
