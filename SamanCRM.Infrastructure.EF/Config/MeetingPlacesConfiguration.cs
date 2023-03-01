using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class MeetingPlacesConfiguration : IEntityTypeConfiguration<MeetingPlaces>
    {
        public void Configure(EntityTypeBuilder<MeetingPlaces> builder)
        {
            builder.ToTable("Tb-MeetingPlaces");
            builder.HasKey(a => a.PlaceID);
            builder.HasIndex(a => new { a.PlaceID, a.BranchID }).IsUnique();
            builder.Property(a => a.PlaceName).HasColumnType("nvarchar(100)").IsRequired();
            builder.Property(a => a.RoomCapacity).HasColumnType("int");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.LapTop).HasColumnType("bit");
            builder.Property(a => a.Internet).HasColumnType("bit");
            builder.Property(a => a.Monitor).HasColumnType("bit");
            builder.Property(a => a.Network).HasColumnType("bit");
            builder.Property(a => a.CoolingAndHeating).HasColumnType("bit");
            builder.Property(a => a.MicroPhone).HasColumnType("bit");
            builder.Property(a => a.WhiteBoard).HasColumnType("bit");
            builder.Property(a => a.Projector).HasColumnType("bit");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
