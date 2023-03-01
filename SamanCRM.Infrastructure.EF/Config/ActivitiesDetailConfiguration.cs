using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ActivitiesDetailConfiguration : IEntityTypeConfiguration<ActivitiesDetail>
    {
        public void Configure(EntityTypeBuilder<ActivitiesDetail> builder)
        {
            builder.ToTable("Tb-ActivitiesDetail");
            builder.HasKey(a => a.DetailID);
            builder.HasIndex(a => new { a.DetailID, a.BranchID }).IsUnique();
            builder.Property(a => a.Subject).HasColumnType("nvarchar(60)");
            builder.Property(a => a.RelatedTo).HasColumnType("int");
            builder.Property(a => a.RelatedToInput).HasColumnType("int");
            builder.Property(a => a.PhoneNumber).HasColumnType("nvarchar(40)");
            builder.Property(a => a.InternalNum).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.MeetingPlace).HasColumnType("nvarchar(70)");
            builder.Property(a => a.Type).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Date).HasColumnType("nvarchar(80)");
            builder.Property(a => a.Time).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Duration).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Meetinglocation).HasColumnType("nvarchar(80)");
            builder.Property(a => a.UserSMS).HasColumnType("nvarchar(80)");
            builder.Property(a => a.GuestsSMS).HasColumnType("nvarchar(80)");
            builder.Property(a => a.SoftwareReminder).HasColumnType("nvarchar(80)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.SendInvitation).HasColumnType("bit");
            builder.Property(a => a.GuestFullName).HasColumnType("nvarchar(60)");
            builder.Property(a => a.Email).HasColumnType("nvarchar(155)");
            builder.Property(a => a.Deadline).HasColumnType("nvarchar(80)");
            builder.Property(a => a.StartTime).HasColumnType("nvarchar(80)");
            builder.Property(a => a.Note).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Customer).HasColumnType("nvarchar(60)");
            builder.Property(a => a.Priority).HasColumnType("nvarchar(40)");
            builder.Property(a => a.GroupAnnounce).HasColumnType("nvarchar(80)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
        }
    }
}
