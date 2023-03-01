using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.ToTable("Tb-Project");
            builder.HasKey(a => a.ProjectID);
            builder.HasIndex(a => new { a.ProjectID, a.BranchID }).IsUnique();
            builder.Property(a => a.Name).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.User).HasColumnType("nvarchar(40)");
            builder.Property(a => a.StartDate).HasColumnType("datetime");
            builder.Property(a => a.EndDate).HasColumnType("datetime");
            builder.Property(a => a.ProjectType).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Importance).HasColumnType("nvarchar(30)");
            builder.Property(a => a.AccountantNum).HasColumnType("nvarchar(30)");
            builder.Property(a => a.MainSendGeoLoc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(40)");
            builder.Property(a => a.State).HasColumnType("nvarchar(40)");
            builder.Property(a => a.City).HasColumnType("nvarchar(40)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.MainAddress).HasColumnType("nvarchar(255)");
            builder.Property(a => a.Lat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Long).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Log).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Account).WithMany(a => a.Projects).HasForeignKey(a => a.AccountID);
            builder.HasOne(a => a.Clues).WithMany(a => a.Projects).HasForeignKey(a => a.ClueID);

        }
    }
}
