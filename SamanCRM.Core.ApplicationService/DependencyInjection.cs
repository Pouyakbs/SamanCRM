using AutoMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using SamanCRM.Core.ApplicationService.Config;
using SamanCRM.Core.ApplicationService.Facade;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace SamanCRM.Core.ApplicationService
{
    public static class DependencyInjection
    {
        public static void AddApplicationSevice(this IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new PersonnelProfile());
                mc.AddProfile(new CompanyProfile());
                mc.AddProfile(new BranchProfile());
                mc.AddProfile(new AccountProfile());
                mc.AddProfile(new CampaignProfile());
                mc.AddProfile(new CluesProfile());
                mc.AddProfile(new CompetitorProfile());
                mc.AddProfile(new InvoiceProfile());
                mc.AddProfile(new OpportunitiesProfile());
                mc.AddProfile(new PaymentProfile());
                mc.AddProfile(new PreInvoiceProfile());
                mc.AddProfile(new TargetProfile());
                mc.AddProfile(new ServicesProfile());
                mc.AddProfile(new SaleContractProfile());
                mc.AddProfile(new ProductCategoryProfile());
                mc.AddProfile(new ProductsProfile());
                mc.AddProfile(new ReportProfile());
                mc.AddProfile(new ConfirmationProfile());
                mc.AddProfile(new AnalysisProfile());
                mc.AddProfile(new SupplierProfile());
                mc.AddProfile(new BuyOrderProfile());
                mc.AddProfile(new ProjectProfile());
                mc.AddProfile(new UserProfile());
                mc.AddProfile(new ActivitiesProfile());
                mc.AddProfile(new PasswordComplexityProfile());
                mc.AddProfile(new ProgramPartProfile());
                mc.AddProfile(new PersonsProfile());
                mc.AddProfile(new ApplicationRoleProfile());
                mc.AddProfile(new PersonnelsWithRolesProfile());
                mc.AddProfile(new MeetingPlacesProfile());
                mc.AddProfile(new ArchiveProfile());
                mc.AddProfile(new ConnectionsProfile());
                mc.AddProfile(new ComPublicProfile());
                mc.AddProfile(new ComPublicTitlesProfile());
                mc.AddProfile(new ApplicationSettingsProfile());
                mc.AddProfile(new ServiceProfile());
                mc.AddProfile(new EntitiesProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddScoped<IPersonnelFacade, PersonnelFacade>();
            services.AddScoped<ICompanyFacade, CompanyFacade>();
            services.AddScoped<IBranchFacade, BranchFacade>();
            services.AddScoped<ICluesFacade, CluesFacade>();
            services.AddScoped<IAccountFacade, AccountFacade>();
            services.AddScoped<ICampaignFacade, CampaignFacade>();
            services.AddScoped<ICompetitorFacade, CompetitorFacade>();
            services.AddScoped<IInvoiceFacade, InvoiceFacade>();
            services.AddScoped<IOpportunitiesFacade, OpportunitiesFacade>();
            services.AddScoped<IPreInvoiceFacade, PreInvoiceFacade>();
            services.AddScoped<ITargetFacade, TargetFacade>();
            services.AddScoped<IPaymentFacade, PaymentFacade>();
            services.AddScoped<IApplicationSettingsFacade, ApplicationSettingsFacade>();
            services.AddScoped<IServicesFacade, ServicesFacade>();
            services.AddScoped<ISaleContractFacade, SaleContractFacade>();
            services.AddScoped<IProductCategoryFacade, ProductCategoryFacade>();
            services.AddScoped<IProductsFacade, ProductsFacade>();
            services.AddScoped<IAnalysisFacade, AnalysisFacade>();
            services.AddScoped<IReportFacade, ReportFacade>();
            services.AddScoped<IConfirmationFacade, ConfirmationFacade>();
            services.AddScoped<ISupplierFacade, SupplierFacade>();
            services.AddScoped<IBuyOrderFacade, BuyOrderFacade>();
            services.AddScoped<IProjectFacade, ProjectFacade>();
            services.AddScoped<IUserFacade, UserFacade>();
            services.AddScoped<IActivitiesFacade, ActivitiesFacade>();
            services.AddScoped<IPasswordComplexityFacade, PasswordComplexityFacade>();
            services.AddScoped<IProgramPartFacade, ProgramPartFacade>();
            services.AddScoped<IPersonsFacade, PersonsFacade>();
            services.AddScoped<IApplicationRoleFacade, ApplicationRoleFacade>();
            services.AddScoped<IPersonnelWithRolesFacade, PersonnelWithRolesFacade>();
            services.AddScoped<IMeetingPlacesFacade, MeetingPlacesFacade>();
            services.AddScoped<IArchiveFacade, ArchiveFacade>();
            services.AddScoped<IConnectionsFacade, ConnectionsFacade>();
            services.AddScoped<IComPublicFacade, ComPublicFacade>();
            services.AddScoped<IComPublicTitlesFacade, ComPublicTitlesFacade>();
            services.AddScoped<IServiceFacade, ServiceFacade>();
            services.AddScoped<IEntitiesFacade, EntitiesFacade>();
            services.AddScoped<IUnitOfWork, SamanCRM.Core.ApplicationService.UnitofWork.UnitofWork>();
        }
    }
}
