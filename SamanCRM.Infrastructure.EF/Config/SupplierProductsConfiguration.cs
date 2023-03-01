using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class SupplierProductsConfiguration : IEntityTypeConfiguration<SupplierProducts>
    {
        public void Configure(EntityTypeBuilder<SupplierProducts> builder)
        {
            builder.ToTable("Tb-SupplierProducts");
            builder.HasKey(a => new { a.ProductID, a.SupplierID });
            builder.HasOne(a => a.Products).WithMany(a => a.SupplierProducts).HasForeignKey(a => a.ProductID);
            builder.HasOne(a => a.Supplier).WithMany(a => a.SupplierProducts).HasForeignKey(a => a.SupplierID);
        }
    }
}
