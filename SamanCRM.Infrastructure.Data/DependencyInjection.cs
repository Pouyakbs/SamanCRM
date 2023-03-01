using Microsoft.Extensions.DependencyInjection;
using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Contracts.Repository.Common;
using SamanCRM.Infrastructure.Data.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.Data
{
    public static class DependencyInjection
    {
        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IGenericRepository<ICompanyRepository>, GenericRepository<ICompanyRepository>>();
            services.AddScoped<IGenericRepository<IBranchRepository>, GenericRepository<IBranchRepository>>();
            services.AddScoped<IGenericRepository<IPersonnelRepository>, GenericRepository<IPersonnelRepository>>();
            services.AddScoped<IGenericRepository<ICluesRepository>, GenericRepository<ICluesRepository>>();
            services.AddScoped<IGenericRepository<IAccountRepository>, GenericRepository<IAccountRepository>>();
            services.AddScoped<IGenericRepository<ICampaignRepository>, GenericRepository<ICampaignRepository>>();
            services.AddScoped<IGenericRepository<ICompetitorRepository>, GenericRepository<ICompetitorRepository>>();
            services.AddScoped<IGenericRepository<IInvoiceRepository>, GenericRepository<IInvoiceRepository>>();
            services.AddScoped<IGenericRepository<IOpportunitiesRepository>, GenericRepository<IOpportunitiesRepository>>();
            services.AddScoped<IGenericRepository<IPaymentRepository>, GenericRepository<IPaymentRepository>>();
            services.AddScoped<IGenericRepository<IPreInvoiceRepository>, GenericRepository<IPreInvoiceRepository>>();
            services.AddScoped<IGenericRepository<ITargetRepository>, GenericRepository<ITargetRepository>>();
            services.AddScoped<IGenericRepository<IServicesRepository>, GenericRepository<IServicesRepository>>();
            services.AddScoped<IGenericRepository<ISaleContractRepository>, GenericRepository<ISaleContractRepository>>();
            services.AddScoped<IGenericRepository<IProductCategoryRepository>, GenericRepository<IProductCategoryRepository>>();
            services.AddScoped<IGenericRepository<IProductsRepository>, GenericRepository<IProductsRepository>>();
            services.AddScoped<IGenericRepository<IReportRepository>, GenericRepository<IReportRepository>>();
            services.AddScoped<IGenericRepository<IConfirmationRepository>, GenericRepository<IConfirmationRepository>>();
            services.AddScoped<IGenericRepository<IAnalysisRepository>, GenericRepository<IAnalysisRepository>>();
            services.AddScoped<IGenericRepository<ISupplierRepository>, GenericRepository<ISupplierRepository>>();
            services.AddScoped<IGenericRepository<IBuyOrderRepository>, GenericRepository<IBuyOrderRepository>>();
            services.AddScoped<IGenericRepository<IProjectRepository>, GenericRepository<IProjectRepository>>();
            services.AddScoped<IGenericRepository<IActivitiesRepository>, GenericRepository<IActivitiesRepository>>();
            services.AddScoped<IGenericRepository<IPasswordComplexityRepository>, GenericRepository<IPasswordComplexityRepository>>();
            services.AddScoped<IGenericRepository<IProgramPartRepository>, GenericRepository<IProgramPartRepository>>();
            services.AddScoped<IGenericRepository<IPersonsRepository>, GenericRepository<IPersonsRepository>>();
            services.AddScoped<IGenericRepository<IApplicationRoleRepository>, GenericRepository<IApplicationRoleRepository>>();
            services.AddScoped<IGenericRepository<IMeetingPlacesRepository>, GenericRepository<IMeetingPlacesRepository>>();
            services.AddScoped<IGenericRepository<IComPublicRepository>, GenericRepository<IComPublicRepository>>();
            services.AddScoped<IGenericRepository<IComPublicTitlesRepository>, GenericRepository<IComPublicTitlesRepository>>();
            services.AddScoped<IGenericRepository<IArchiveRepository>, GenericRepository<IArchiveRepository>>();
            services.AddScoped<IGenericRepository<IApplicationSettingsRepository>, GenericRepository<IApplicationSettingsRepository>>();
            services.AddScoped<IGenericRepository<IServiceRepository>, GenericRepository<IServiceRepository>>();
            services.AddScoped<IGenericRepository<IEntitiesRepository>, GenericRepository<IEntitiesRepository>>();

            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IBranchRepository, BranchRepository>();
            services.AddScoped<ICluesRepository, CluesRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<ICampaignRepository, CampaignRepository>();
            services.AddScoped<ICompetitorRepository, CompetitorRepository>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            services.AddScoped<IOpportunitiesRepository, OpportunitiesRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IPreInvoiceRepository, PreInvoiceRepository>();
            services.AddScoped<ITargetRepository, TargetRepository>();
            services.AddScoped<IPersonnelRepository, PersonnelRepository>();
            services.AddScoped<IServicesRepository, ServicesRepository>();
            services.AddScoped<ISaleContractRepository, SaleContractRepository>();
            services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddScoped<IProductsRepository, ProductsRepository>();
            services.AddScoped<IAnalysisRepository, AnalysisRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IConfirmationRepository, ConfirmationRepository>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
            services.AddScoped<IBuyOrderRepository, BuyOrderRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IActivitiesRepository, ActivitiesRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPasswordComplexityRepository, PasswordComplexityRepository>();
            services.AddScoped<IProgramPartRepository, ProgramPartRepository>();
            services.AddScoped<IPersonsRepository, PersonsRepository>();
            services.AddScoped<IApplicationRoleRepository, RoleRepository>();
            services.AddScoped<IPersonnelWithRolesRepository, PersonnelWithRolesRepository>();
            services.AddScoped<IMeetingPlacesRepository, MeetingPlacesRepository>();
            services.AddScoped<IArchiveRepository, ArchiveRepository>();
            services.AddScoped<IComPublicRepository, ComPublicRepository>();
            services.AddScoped<IComPublicTitlesRepository, ComPublicTitlesRepository>();
            services.AddScoped<IApplicationSettingsRepository, ApplicationSettingsRepository>();
            services.AddScoped<IServiceRepository, ServiceRepository>();
            services.AddScoped<IEntitiesRepository, EntitiesRepository>();
        }
    }
}
