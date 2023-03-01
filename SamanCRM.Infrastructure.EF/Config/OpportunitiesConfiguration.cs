using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class OpportunitiesConfiguration : IEntityTypeConfiguration<Opportunities>
    {
        public void Configure(EntityTypeBuilder<Opportunities> builder)
        {
            builder.ToTable("Tb-Opportunities");
            builder.HasKey(a => a.OpportunityID);
            builder.HasIndex(a => new { a.OpportunityID, a.BranchID }).IsUnique();
            builder.Property(a => a.OpportunityName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.AccountName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Campaign).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ClueSource).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ExpectedPrice).HasColumnType("float(53)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(20)");
            builder.Property(a => a.NextStep).HasColumnType("nvarchar(30)");
            builder.Property(a => a.PayTermEndDate).HasColumnType("datetime");
            builder.Property(a => a.Price).HasColumnType("float(53)");
            builder.Property(a => a.PriceBased).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Priority).HasColumnType("nvarchar(60)");
            builder.Property(a => a.Project).HasColumnType("nvarchar(60)");
            builder.Property(a => a.ReasonofLoss).HasColumnType("nvarchar(255)");
            builder.Property(a => a.SaleDate).HasColumnType("datetime");
            builder.Property(a => a.SaleForecast).HasColumnType("nvarchar(60)");
            builder.Property(a => a.SaleProcess).HasColumnType("nvarchar(50)");
            builder.Property(a => a.SendingInvoiceTerms).HasColumnType("nvarchar(255)");
            builder.Property(a => a.SuccessProssibility).HasColumnType("nvarchar(15)");
            builder.Property(a => a.ProductList).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Type).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Account).WithMany(a => a.Opportunities).HasForeignKey(a => a.AccountID);
        }
    }
}
