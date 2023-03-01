using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class SupportContractConfiguration : IEntityTypeConfiguration<SupportContract>
    {
        public void Configure(EntityTypeBuilder<SupportContract> builder)
        {
            builder.ToTable("Tb-ServiceContract");
            builder.HasKey(a => a.ContractID);
            builder.HasIndex(a => new { a.ContractID, a.BranchID }).IsUnique();
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ContractStartDate).HasColumnType("datetime");
            builder.Property(a => a.ContractEndDate).HasColumnType("datetime");
            builder.Property(a => a.ContractReminder).HasColumnType("nvarchar(60)");
            builder.Property(a => a.ContractType).HasColumnType("nvarchar(50)");
            builder.Property(a => a.PriceAdjustment).HasColumnType("int");
            builder.Property(a => a.Discount).HasColumnType("int");
            builder.Property(a => a.FinalPrice).HasColumnType("float(53)");
            builder.Property(a => a.User).HasColumnType("int");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ServiceUnit).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Limitation).HasColumnType("nvarchar(70)");
            builder.Property(a => a.RecievedService).HasColumnType("int");
            builder.Property(a => a.ServiceRemaining).HasColumnType("nvarchar(70)");
            builder.Property(a => a.Attractiveness).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SpecialTerms).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.SignOfCustomer).HasColumnType("nvarchar(80)");
            builder.Property(a => a.InternalSign).HasColumnType("nvarchar(80)");
            builder.Property(a => a.CustomerSignTitle).HasColumnType("nvarchar(80)");
            builder.Property(a => a.InternalSignDate).HasColumnType("datetime");
            builder.Property(a => a.CustomerSignDate).HasColumnType("datetime");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
