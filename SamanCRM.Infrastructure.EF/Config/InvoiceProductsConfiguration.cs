using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class InvoiceProductsConfiguration : IEntityTypeConfiguration<InvoiceProducts>
    {
        public void Configure(EntityTypeBuilder<InvoiceProducts> builder)
        {
            builder.ToTable("Tb-InvoiceProducts");
            builder.HasKey(a => new { a.ProductID, a.InvoiceID });
            builder.HasOne(a => a.Products).WithMany(a => a.InvoiceProducts).HasForeignKey(a => a.ProductID);
            builder.HasOne(a => a.Invoice).WithMany(a => a.InvoiceProducts).HasForeignKey(a => a.InvoiceID);
        }
    }
}
