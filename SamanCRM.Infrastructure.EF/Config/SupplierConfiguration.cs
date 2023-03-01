using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.ToTable("Tb-Supplier");
            builder.HasKey(a => a.SupplierID);
            builder.HasIndex(a => new { a.SupplierID, a.BranchID }).IsUnique();
            builder.Property(a => a.NickName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Surname).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ContactFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Emails).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Website).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Attractiveness).HasColumnType("nvarchar(60)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SupplierNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.User).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Industry).HasColumnType("nvarchar(50)");
            builder.Property(a => a.SubIndustry).HasColumnType("nvarchar(50)");
            builder.Property(a => a.EcoCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.NationalNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.SubNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.BillSendGeoLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.BillCountry).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BillState).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BillCity).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BillPostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.BillAddress).HasColumnType("nvarchar(255)");
            builder.Property(a => a.BillLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.BillLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProdSendGeoLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProdCountry).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProdState).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProdCity).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProdPostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ProdAddress).HasColumnType("nvarchar(255)");
            builder.Property(a => a.ProdLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProdLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.LinkedIn).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Instagram).HasColumnType("nvarchar(255)");
            builder.Property(a => a.FaceBook).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Blog).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Twitter).HasColumnType("nvarchar(255)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.AccountID).HasColumnType("int");
        }
    }
}
