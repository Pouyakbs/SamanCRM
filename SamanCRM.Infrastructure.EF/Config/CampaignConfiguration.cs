using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class CampaignConfiguration : IEntityTypeConfiguration<Campaign>
    {
        public void Configure(EntityTypeBuilder<Campaign> builder)
        {
            builder.ToTable("Tb-Campaign");
            builder.HasKey(a => a.CampaignID);
            builder.HasIndex(a => new { a.CampaignID, a.BranchID }).IsUnique();
            builder.Property(a => a.CampaignName).HasColumnType("nvarchar(40)").IsRequired();
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Type).HasColumnType("nvarchar(40)");
            builder.Property(a => a.StartDate).HasColumnType("datetime");
            builder.Property(a => a.Target).HasColumnType("nvarchar(50)");
            builder.Property(a => a.EndDate).HasColumnType("datetime").IsRequired();
            builder.Property(a => a.Budget).HasColumnType("float(53)");
            builder.Property(a => a.ExpectedAnswer).HasColumnType("nvarchar(50)");
            builder.Property(a => a.RepetitionRate).HasColumnType("nvarchar(30)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(15)");
            builder.Property(a => a.ReadEmails).HasColumnType("nvarchar(60)");
            builder.Property(a => a.RealCost).HasColumnType("float(53)");
            builder.Property(a => a.ExpectedCost).HasColumnType("float(53)");
            builder.Property(a => a.ExpectedIncome).HasColumnType("float(53)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
