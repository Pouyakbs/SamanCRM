using SamanCRM.Core.Contracts.Repository;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Infrastructure.Data;
using SamanCRM.Infrastructure.EF;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.UnitofWork
{
    public class UnitofWork : IUnitOfWork
    {
        private DemoContext context;

        public UnitofWork(DemoContext context)
        {
            this.context = context;
            Company = new CompanyRepository(this.context);
            Connections = new ConnectionsRepository(this.context);
            Branch = new BranchRepository(this.context);
            Personnel = new PersonnelRepository(this.context);
            Opportunities = new OpportunitiesRepository(this.context);
            Target = new TargetRepository(this.context);
            Account = new AccountRepository(this.context);
            Campaign = new CampaignRepository(this.context);
            Clues = new CluesRepository(this.context);
            Payment = new PaymentRepository(this.context);
            Invoice = new InvoiceRepository(this.context);
            PreInvoice = new PreInvoiceRepository(this.context);
            Competitor = new CompetitorRepository(this.context);
            Services = new ServicesRepository(this.context);
            SaleContract = new SaleContractRepository(this.context);
            ProductCategory = new ProductCategoryRepository(this.context);
            Products = new ProductsRepository(this.context);
            Confirmation = new ConfirmationRepository(this.context);
            Analysis = new AnalysisRepository(this.context);
            Report = new ReportRepository(this.context);
            Supplier = new SupplierRepository(this.context);
            BuyOrder = new BuyOrderRepository(this.context);
            Project = new ProjectRepository(this.context);
            Activities = new ActivitiesRepository(this.context);
            PasswordComplexity = new PasswordComplexityRepository(this.context);
            ProgramPart = new ProgramPartRepository(this.context);
            Persons = new PersonsRepository(this.context);
            ApplicationRoles = new RoleRepository(this.context);
            PersonnelWithRoles = new PersonnelWithRolesRepository(this.context);
            MeetingPlaces = new MeetingPlacesRepository(this.context);
            Archive = new ArchiveRepository(this.context);
            ComPublicTitles = new ComPublicTitlesRepository(this.context);
            ComPublics = new ComPublicRepository(this.context);
            ApplicationSettings = new ApplicationSettingsRepository(this.context);
            Service = new ServiceRepository(this.context);
            Entities = new EntitiesRepository(this.context);
            SupportContract = new SupportContractRepository(this.context);
        }
        public ICompanyRepository Company { get; private set; }
        public IConnectionsRepository Connections { get; private set; }
        public IBranchRepository Branch { get; private set; }
        public IPersonnelRepository Personnel { get; private set; }
        public IAccountRepository Account { get; private set; }
        public ICampaignRepository Campaign { get; private set; }
        public ICluesRepository Clues { get; private set; }
        public IPaymentRepository Payment { get; private set; }
        public IOpportunitiesRepository Opportunities { get; private set; }
        public ITargetRepository Target { get; private set; }
        public IInvoiceRepository Invoice { get; private set; }
        public IPreInvoiceRepository PreInvoice { get; private set; }
        public ICompetitorRepository Competitor { get; private set; }
        public IServicesRepository Services { get; private set; }
        public ISaleContractRepository SaleContract { get; private set; }
        public IProductCategoryRepository ProductCategory { get; private set; }
        public IProductsRepository Products { get; private set; }
        public IReportRepository Report { get; private set; }
        public IAnalysisRepository Analysis { get; private set; }
        public IConfirmationRepository Confirmation { get; private set; }
        public ISupplierRepository Supplier { get; private set; }
        public IBuyOrderRepository BuyOrder { get; private set; }
        public IProjectRepository Project { get; private set; }
        public IActivitiesRepository Activities { get; private set; }
        public IPasswordComplexityRepository PasswordComplexity { get; private set; }
        public IProgramPartRepository ProgramPart { get; private set; }
        public IPersonsRepository Persons { get; private set; }
        public IApplicationRoleRepository ApplicationRoles { get; private set; }
        public IPersonnelWithRolesRepository PersonnelWithRoles { get; private set; }
        public IMeetingPlacesRepository MeetingPlaces { get; private set; }
        public IArchiveRepository Archive { get; private set; }
        public IComPublicTitlesRepository ComPublicTitles { get; }
        public IComPublicRepository ComPublics { get; }
        public IApplicationSettingsRepository ApplicationSettings { get; }
        public IServiceRepository Service { get; }
        public IEntitiesRepository Entities { get; }
        public ISupportContractRepository SupportContract { get; }

        public void Dispose()
        {
            context.Dispose();
        }
        public int Save()
        {
            return context.SaveChanges();
        }
    }
}