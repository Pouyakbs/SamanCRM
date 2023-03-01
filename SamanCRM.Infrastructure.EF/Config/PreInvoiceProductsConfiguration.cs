using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PreInvoiceProductsConfiguration : IEntityTypeConfiguration<PreInvoiceProducts>
    {
        public void Configure(EntityTypeBuilder<PreInvoiceProducts> builder)
        {
            builder.ToTable("Tb-PreInvoiceProducts");
            builder.HasKey(a => new { a.PreInvoiceID, a.ProductsID });
            builder.HasOne(a => a.PreInvoice).WithMany(a => a.PreInvoiceProducts).HasForeignKey(a => a.PreInvoiceID);
            builder.HasOne(a => a.Products).WithMany(a => a.PreInvoiceProducts).HasForeignKey(a => a.ProductsID);
        }
    }
}
