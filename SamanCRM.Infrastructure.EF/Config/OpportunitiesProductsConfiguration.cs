using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class OpportunitiesProductsConfiguration : IEntityTypeConfiguration<OpportunitiesProducts>
    {
        public void Configure(EntityTypeBuilder<OpportunitiesProducts> builder)
        {
            builder.ToTable("Tb-OpportunitiesProducts");
            builder.HasKey(a => new { a.OpportunitiesID, a.ProductsID });
            builder.HasOne(a => a.Opportunities).WithMany(a => a.OpportunitiesProducts).HasForeignKey(a => a.OpportunitiesID);
            builder.HasOne(a => a.Products).WithMany(a => a.OpportunitiesProducts).HasForeignKey(a => a.ProductsID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
