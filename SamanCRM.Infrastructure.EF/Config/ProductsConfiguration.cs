using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ProductsConfiguration : IEntityTypeConfiguration<Products>
    {
        public void Configure(EntityTypeBuilder<Products> builder)
        {
            builder.ToTable("Tb-Products");
            builder.HasKey(a => a.ProductID);
            builder.HasIndex(a => new { a.ProductID, a.BranchID }).IsUnique();
            builder.Property(a => a.ProductName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ProductCode).HasColumnType("nvarchar(80)");
            builder.Property(a => a.ProductURL).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Barcode).HasColumnType("nvarchar(max)");
            builder.Property(a => a.BatchNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Brand).HasColumnType("nvarchar(60)");
            builder.Property(a => a.PurchasePrice).HasColumnType("float(53)");
            builder.Property(a => a.HoursCount).HasColumnType("int");
            builder.Property(a => a.Length).HasColumnType("float(53)");
            builder.Property(a => a.Width).HasColumnType("float(53)");
            builder.Property(a => a.Height).HasColumnType("float(53)");
            builder.Property(a => a.NetWeight).HasColumnType("float(53)");
            builder.Property(a => a.GrossWeight).HasColumnType("float(53)");
            builder.Property(a => a.PocketNum).HasColumnType("int");
            builder.Property(a => a.InvoiceType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.LatNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.MainMeasurement).HasColumnType("nvarchar(60)");
            builder.Property(a => a.SecondMeasurement).HasColumnType("nvarchar(60)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(30)");
            builder.Property(a => a.NeedProductReturn).HasColumnType("bit");
            builder.Property(a => a.NumPerUnit).HasColumnType("nvarchar(15)");
            builder.Property(a => a.OrderRate).HasColumnType("nvarchar(30)");
            builder.Property(a => a.SafetyStock).HasColumnType("nvarchar(15)");
            builder.Property(a => a.Saleable).HasColumnType("bit");
            builder.Property(a => a.SalePrice).HasColumnType("float(53)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(20)");
            builder.Property(a => a.SerialNum).HasColumnType("nvarchar(10)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(35)");
            builder.Property(a => a.StoreInventory).HasColumnType("nvarchar(15)");
            builder.Property(a => a.ValidityDate).HasColumnType("datetime");
            builder.Property(a => a.Pursuer).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Type).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.ProductCategory).WithMany(a => a.Products).HasForeignKey(a => a.CategoryID);
        }
    }
}
