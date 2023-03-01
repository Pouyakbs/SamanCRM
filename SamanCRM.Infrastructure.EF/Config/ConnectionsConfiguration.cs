using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ConnectionsConfiguration : IEntityTypeConfiguration<Connections>
    {
        public void Configure(EntityTypeBuilder<Connections> builder)
        {
            builder.ToTable("Tb-Connections");
            builder.HasKey(a => a.ConnectionsID);
            builder.HasIndex(a => new { a.ConnectionsID, a.BranchID }).IsUnique();
            builder.Property(a => a.Title).HasColumnType("nvarchar(40)").IsRequired();
            builder.Property(a => a.MaduleName).HasColumnType("nvarchar(40)").IsRequired();
            builder.Property(a => a.RecordType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Condition).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ConditionAmount).HasColumnType("nvarchar(40)");
            builder.Property(a => a.MessageTitle).HasColumnType("nvarchar(40)");
            builder.Property(a => a.EmailTitle).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Frame).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ActiveConnection).HasColumnType("bit");
            builder.Property(a => a.SendMessage).HasColumnType("bit");
            builder.Property(a => a.SendEmail).HasColumnType("bit");

        }
    }
}
