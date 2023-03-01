using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class BranchUserConfiguration : IEntityTypeConfiguration<BranchUser>
    {
        public void Configure(EntityTypeBuilder<BranchUser> builder)
        {
            builder.ToTable("Tb-BranchUser");
            builder.HasKey(a => new { a.UserID, a.BranchID });
            builder.HasOne(a => a.Branch).WithMany(a => a.BranchUsers).HasForeignKey(a => a.BranchID);
            builder.HasOne(a => a.ApplicationUser).WithMany(a => a.BranchUsers).HasForeignKey(a => a.UserID);
        }
    }
}
