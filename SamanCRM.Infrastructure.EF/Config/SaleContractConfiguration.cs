using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class SaleContractConfiguration : IEntityTypeConfiguration<SaleContract>
    {
        public void Configure(EntityTypeBuilder<SaleContract> builder)
        {
            builder.ToTable("Tb-SaleContract");
            builder.HasKey(a => a.ContractID);
            builder.HasIndex(a => new { a.ContractID, a.BranchID }).IsUnique();
            builder.Property(a => a.CompanySignDate).HasColumnType("datetime");
            builder.Property(a => a.RelatedTo).HasColumnType("int");
            builder.Property(a => a.RelatedToInput).HasColumnType("int");
            builder.Property(a => a.ContractManager).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ContractTitle).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ContractType).HasColumnType("nvarchar(50)");
            builder.Property(a => a.SuccessRate).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CustomerSignDate).HasColumnType("datetime");
            builder.Property(a => a.StartDate).HasColumnType("datetime");
            builder.Property(a => a.EndDate).HasColumnType("datetime");
            builder.Property(a => a.Customer).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Discount).HasColumnType("float(53)");
            builder.Property(a => a.GoodJobDeposit).HasColumnType("float(53)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(25)");
            builder.Property(a => a.OtherAdditions).HasColumnType("nvarchar(70)");
            builder.Property(a => a.ReferenceCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.RelatedTo).HasColumnType("nvarchar(35)");
            builder.Property(a => a.Shipment).HasColumnType("nvarchar(35)");
            builder.Property(a => a.ShipmentTax).HasColumnType("float(53)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SubTotal).HasColumnType("float(53)");
            builder.Property(a => a.Tax).HasColumnType("float(53)");
            builder.Property(a => a.Total).HasColumnType("float(53)");
            builder.Property(a => a.TotalCount).HasColumnType("float(53)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");

        }
    }
}
