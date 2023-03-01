using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class BuyOrderConfiguration : IEntityTypeConfiguration<BuyOrder>
    {
        public void Configure(EntityTypeBuilder<BuyOrder> builder)
        {
            builder.ToTable("Tb-BuyOrder");
            builder.HasKey(a => a.OrderID);
            builder.HasIndex(a => new { a.OrderID, a.BranchID }).IsUnique();
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Number).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Customer).HasColumnType("nvarchar(40)");
            builder.Property(a => a.OrderDate).HasColumnType("datetime");
            builder.Property(a => a.TaxRate).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ForOpportunity).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SupplierID).HasColumnType("int");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(25)");
            builder.Property(a => a.Totalprice).HasColumnType("float(53)");
            builder.Property(a => a.Discount).HasColumnType("float(53)");
            builder.Property(a => a.Subset).HasColumnType("float(53)");
            builder.Property(a => a.Transport).HasColumnType("float(53)");
            builder.Property(a => a.TransportTax).HasColumnType("float(53)");
            builder.Property(a => a.Tax).HasColumnType("float(53)");
            builder.Property(a => a.TotalAmount).HasColumnType("float(53)");
            builder.Property(a => a.OtherExpenses).HasColumnType("float(53)");
            builder.Property(a => a.ProductSubTotal).HasColumnType("float(53)");
            builder.Property(a => a.TotalCount).HasColumnType("float(53)");
            builder.Property(a => a.ServiceSubTotal).HasColumnType("float(53)");
            builder.Property(a => a.CustomerReminder).HasColumnType("nvarchar(60)");
            builder.Property(a => a.MaturityDate).HasColumnType("datetime");
            builder.Property(a => a.SupplierReqNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.TrackingNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ProductSendMethod).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProductSendType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.PhasedDelivery).HasColumnType("nvarchar(30)");
            builder.Property(a => a.PaymentMethod).HasColumnType("nvarchar(30)");
            builder.Property(a => a.PaymentStatus).HasColumnType("nvarchar(40)");
            builder.Property(a => a.PaymentDesc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Category).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Terms).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Notes).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Files).HasColumnType("image");
            builder.Property(a => a.BillSendGeoLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.BillCountry).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BillState).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BillCity).HasColumnType("nvarchar(40)");
            builder.Property(a => a.BillPostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.BillAddress).HasColumnType("nvarchar(255)");
            builder.Property(a => a.BillLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.BillLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProdSendGeoLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProdCountry).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProdState).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProdCity).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ProdPostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ProdAddress).HasColumnType("nvarchar(255)");
            builder.Property(a => a.ProdLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProdLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.ProductList).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");

        }
    }
}
