//using System;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata;

//// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
//// If you have enabled NRTs for your project, then un-comment the following line:
//// #nullable disable

//namespace SamanCRM.Core.Domain.Models
//{
//    public partial class SamanCRMContext : DbContext
//    {
//        public SamanCRMContext()
//        {
//        }

//        public SamanCRMContext(DbContextOptions<SamanCRMContext> options)
//            : base(options)
//        {
//        }

//        public virtual DbSet<PersonnelWithRoles> PersonnelWithRoles { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.;Database=SamanCRM;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true");
//            }
//        }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<PersonnelWithRoles>(entity =>
//            {
//                entity.HasNoKey();

//                entity.ToView("PersonnelWithRoles");

//                entity.Property(e => e.ParentId).HasColumnName("ParentID");

//                entity.Property(e => e.PersonnelId).HasColumnName("PersonnelID");

//                entity.Property(e => e.RoleId).HasColumnName("RoleID");

//                entity.Property(e => e.RoleName).HasMaxLength(40);

//                entity.Property(e => e.WorkingUnit).HasMaxLength(60);
//            });

//            OnModelCreatingPartial(modelBuilder);
//        }

//        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//    }
//}
