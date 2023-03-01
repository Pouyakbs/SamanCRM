using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class OpportunitiesCampaignConfiguration : IEntityTypeConfiguration<OpportunitiesCampaign>
    {
        public void Configure(EntityTypeBuilder<OpportunitiesCampaign> builder)
        {
            builder.ToTable("Tb-OpportunitiesCampaign");
            builder.HasKey(a => new { a.OpportunitiesID, a.CampaignID });
            builder.HasOne(a => a.Opportunities).WithMany(a => a.OpportunitiesCampaigns).HasForeignKey(a => a.OpportunitiesID);
            builder.HasOne(a => a.Campaign).WithMany(a => a.OpportunitiesCampaigns).HasForeignKey(a => a.CampaignID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
