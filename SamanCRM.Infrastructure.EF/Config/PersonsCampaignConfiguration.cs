using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class PersonsCampaignConfiguration : IEntityTypeConfiguration<PersonsCampaign>
    {
        public void Configure(EntityTypeBuilder<PersonsCampaign> builder)
        {
            builder.ToTable("Tb-PersonsCampaign");
            builder.HasKey(a => new { a.PersonID, a.CampaignID });
            builder.HasOne(a => a.Persons).WithMany(a => a.PersonsCampaigns).HasForeignKey(a => a.PersonID);
            builder.HasOne(a => a.Campaign).WithMany(a => a.PersonsCampaign).HasForeignKey(a => a.CampaignID);
        }
    }
}
