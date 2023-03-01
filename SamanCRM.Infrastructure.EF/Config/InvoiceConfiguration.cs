using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.ToTable("Tb-Invoice");
            builder.HasKey(a => a.InvoiceID);
            builder.HasIndex(a => new { a.InvoiceID, a.BranchID }).IsUnique();
            builder.Property(a => a.Title).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Address).HasColumnType("nvarchar(500)");
            builder.Property(a => a.City).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(30)");
            builder.Property(a => a.OtherAddress).HasColumnType("nvarchar(500)");
            builder.Property(a => a.OtherCity).HasColumnType("nvarchar(30)");
            builder.Property(a => a.OtherCountry).HasColumnType("nvarchar(30)");
            builder.Property(a => a.CustomerSMS).HasColumnType("nvarchar(70)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Discount).HasColumnType("float(53)");
            builder.Property(a => a.GeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherGeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.GoodJobDeposit).HasColumnType("float(53)");
            builder.Property(a => a.GoodJobDepositPercentage).HasColumnType("nvarchar(35)");
            builder.Property(a => a.InsuranceAmount).HasColumnType("float(53)");
            builder.Property(a => a.InsuranceAmountPercentage).HasColumnType("nvarchar(35)");
            builder.Property(a => a.InternalVerify).HasColumnType("nvarchar(40)");
            builder.Property(a => a.InternalVerifyProblems).HasColumnType("nvarchar(255)");
            builder.Property(a => a.InvoiceDate).HasColumnType("datetime");
            builder.Property(a => a.InvoiceNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Lat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Long).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(25)");
            builder.Property(a => a.Note).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherAdditions).HasColumnType("nvarchar(70)");
            builder.Property(a => a.PaymentConditions).HasColumnType("nvarchar(80)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.OtherPostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.PreInvoiceNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.PreInvoiceSenderCompany).HasColumnType("nvarchar(40)");
            builder.Property(a => a.PreInvoicePrintFrame).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProductSendMethod).HasColumnType("nvarchar(20)");
            builder.Property(a => a.ProductSendType).HasColumnType("nvarchar(25)");
            builder.Property(a => a.ReferenceCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.RelatedTo).HasColumnType("int");
            builder.Property(a => a.RelatedToInput).HasColumnType("int");
            builder.Property(a => a.Shipment).HasColumnType("float(53)");
            builder.Property(a => a.ShipmentTax).HasColumnType("float(53)");
            builder.Property(a => a.ShipmentTaxPercentage).HasColumnType("nvarchar(35)");
            builder.Property(a => a.State).HasColumnType("nvarchar(30)");
            builder.Property(a => a.OtherState).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SubTotal).HasColumnType("float(53)");
            builder.Property(a => a.Tax).HasColumnType("float(53)");
            builder.Property(a => a.Total).HasColumnType("float(53)");
            builder.Property(a => a.TotalCount).HasColumnType("float(53)");
            builder.Property(a => a.TotalReceivable).HasColumnType("float(53)");
            builder.Property(a => a.User).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Project).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ValidityLimit).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Account).WithMany(a => a.Invoices).HasForeignKey(a => a.AccountID);
        }
    }
}
