using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SamanCRM.Core.Domain.Entities;

namespace SamanCRM.Infrastructure.EF.Config
{
    public class CluesConfiguration : IEntityTypeConfiguration<Clues>
    {
        public void Configure(EntityTypeBuilder<Clues> builder)
        {
            builder.ToTable("Tb-Clues");
            builder.HasKey(a => a.ClueID);
            builder.HasIndex(a => new { a.ClueID, a.BranchID }).IsUnique();
            builder.Property(a => a.Type).HasColumnType("nvarchar(40)");
            builder.Property(a => a.NickName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.Segment).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ClueCampaign).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ClueSource).HasColumnType("nvarchar(30)");
            builder.Property(a => a.BirthDate).HasColumnType("datetime");
            builder.Property(a => a.FirstName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.LastName).HasColumnType("nvarchar(40)");
            builder.Property(a => a.NationalCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.AccountName).HasColumnType("nvarchar(25)");
            builder.Property(a => a.Address).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherAddress).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Attractiveness).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Blog).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Status).HasColumnType("nvarchar(40)");
            builder.Property(a => a.SubNumber).HasColumnType("nvarchar(40)");
            builder.Property(a => a.RefferedBy).HasColumnType("nvarchar(40)");
            builder.Property(a => a.EcoCode).HasColumnType("nvarchar(30)");
            builder.Property(a => a.Country).HasColumnType("nvarchar(50)");
            builder.Property(a => a.State).HasColumnType("nvarchar(50)");
            builder.Property(a => a.City).HasColumnType("nvarchar(50)");
            builder.Property(a => a.OtherCountry).HasColumnType("nvarchar(50)");
            builder.Property(a => a.OtherState).HasColumnType("nvarchar(50)");
            builder.Property(a => a.OtherCity).HasColumnType("nvarchar(50)");
            builder.Property(a => a.Emails).HasColumnType("nvarchar(max)");
            builder.Property(a => a.PostalCode).HasColumnType("nvarchar(35)");
            builder.Property(a => a.OtherPostalCode).HasColumnType("nvarchar(35)");
            builder.Property(a => a.Instagram).HasColumnType("nvarchar(max)");
            builder.Property(a => a.LinkedIn).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Twitter).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Desc).HasColumnType("nvarchar(max)");
            builder.Property(a => a.GeographyCode).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Lat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Long).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherGeographyCode).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherLat).HasColumnType("nvarchar(max)");
            builder.Property(a => a.OtherLong).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Industry).HasColumnType("nvarchar(60)");
            builder.Property(a => a.SubIndustry).HasColumnType("nvarchar(40)");
            builder.Property(a => a.ContactFields).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Website).HasColumnType("nvarchar(max)");
            builder.Property(a => a.Facebook).HasColumnType("nvarchar(max)");
            builder.Property(a => a.CreatedByUser).HasColumnType("nvarchar(50)");
            builder.Property(a => a.CreatedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedDate).HasColumnType("datetime");
            builder.Property(a => a.ModifiedByUser).HasColumnType("nvarchar(50)");
            builder.HasOne(a => a.Opportunities).WithOne(a => a.Clues).HasForeignKey<Opportunities>(a => a.ClueID);
        }
    }
}
