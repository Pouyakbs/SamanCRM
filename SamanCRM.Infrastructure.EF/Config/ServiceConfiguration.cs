using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.ToTable("Tb-Service");
            builder.HasKey(a => a.ServiceID);
            builder.Property(a => a.Name).HasColumnType("nvarchar(60)").HasComment("نام خدمت");
            builder.Property(a => a.ServiceUnit).HasColumnType("nvarchar(50)").HasComment("واحد ارائه خدمات");
            builder.Property(a => a.Price).HasColumnType("float(53)").HasComment("قیمت");
            builder.Property(a => a.Limitation).HasColumnType("int").HasComment("حد مجاز");
            builder.Property(a => a.MoneyUnit).HasColumnType("nvarchar(50)").HasComment("واحد پول");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)").HasComment("کاربر ایجاد کننده");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime").HasComment("تاریخ ایجاد");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime").HasComment("تاریخ تغییر");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)").HasComment("کاربر ویرایش کننده");
        }
    }
}
