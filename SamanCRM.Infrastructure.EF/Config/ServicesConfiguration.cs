using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ServicesConfiguration : IEntityTypeConfiguration<Services>
    {
        public void Configure(EntityTypeBuilder<Services> builder)
        {
            builder.ToTable("Tb-Services");
            builder.HasKey(a => a.ServiceID);
            builder.HasIndex(a => new { a.ServiceID, a.BranchID }).IsUnique();
            builder.Property(a => a.AnnounceChannel).HasColumnType("nvarchar(40)"); 
            builder.Property(a => a.Category).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CustomerReason).HasColumnType("nvarchar(155)");
            builder.Property(a => a.DeviceLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.DeviceLocInput).HasColumnType("nvarchar(max)");
            builder.Property(a => a.FileTitle).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Files).HasColumnType("image");
            builder.Property(a => a.FirstLayerUser).HasColumnType("nvarchar(40)");
            builder.Property(a => a.GeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.InstallLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Intensity).HasColumnType("nvarchar(50)");
            builder.Property(a => a.InternalDesc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Priority).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ReceiveDate).HasColumnType("datetime");
            builder.Property(a => a.Time).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SecondLayerUser).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ServiceNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.ServiceReason).HasColumnType("nvarchar(100)");
            builder.Property(a => a.ServiceType).HasColumnType("nvarchar(60)");
            builder.Property(a => a.Solution).HasColumnType("nvarchar(80)");
            builder.Property(a => a.Subject).HasColumnType("nvarchar(60)");
            builder.Property(a => a.TeamName).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Address).HasColumnType("nvarchar(500)");
            builder.Property(a => a.City).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.GeographyLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Lat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Long).HasColumnType("nvarchar(max)");
            builder.Property(a => a.State).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Persons).WithMany(a => a.Services).HasForeignKey(a => a.PersonsID).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(a => a.Account).WithMany(a => a.Services).HasForeignKey(a => a.AccountID);
            builder.HasOne(a => a.Products).WithMany(a => a.Services).HasForeignKey(a => a.ProductID);

        }
    }
}
