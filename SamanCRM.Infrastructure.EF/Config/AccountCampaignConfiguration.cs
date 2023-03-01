using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class AccountCampaignConfiguration : IEntityTypeConfiguration<AccountCampaign>
    {
        public void Configure(EntityTypeBuilder<AccountCampaign> builder)
        {
            builder.ToTable("Tb-AccountCampaign");
            builder.HasKey(a => new { a.AccountID, a.CampaignID });
            builder.HasOne(a => a.Account).WithMany(a => a.AccountCampaigns).HasForeignKey(a => a.AccountID);
            builder.HasOne(a => a.Campaign).WithMany(a => a.AccountCampaigns).HasForeignKey(a => a.CampaignID);
        }
    }
}
