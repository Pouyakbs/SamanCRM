using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Tb-Payment");
            builder.HasKey(a => a.PaymentID);
            builder.HasIndex(a => new { a.PaymentID, a.BranchID }).IsUnique();
            builder.Property(a => a.PaymentCompany).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Amount).HasColumnType("float(53)");
            builder.Property(a => a.Branch).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Customer).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CustomerSMS).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Direction).HasColumnType("nvarchar(60)");
            builder.Property(a => a.DoneDate).HasColumnType("datetime");
            builder.Property(a => a.RelatedTo).HasColumnType("int");
            builder.Property(a => a.RelatedToInput).HasColumnType("int");
            builder.Property(a => a.ForecastedDate).HasColumnType("datetime");
            builder.Property(a => a.Fund).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Assignedcount).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Remaincount).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Factor).HasColumnType("nvarchar(max)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(25)");
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Number).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Associated).HasColumnType("nvarchar(30)");
            builder.Property(a => a.PaymentMethod).HasColumnType("nvarchar(50)");
            builder.Property(a => a.ReferenceNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Type).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
