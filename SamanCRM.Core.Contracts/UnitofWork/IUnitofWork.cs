using SamanCRM.Core.Contracts.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SamanCRM.Core.Contracts.UnitofWork
{
    public interface IUnitOfWork : IDisposable
    {
        public ICompanyRepository Company { get; }
        public IConnectionsRepository Connections { get; }
        public IBranchRepository Branch { get; }
        public IPersonnelRepository Personnel { get; }
        public ICluesRepository Clues { get; }
        public ICampaignRepository Campaign { get; }
        public IAccountRepository Account { get; }
        public IPaymentRepository Payment { get; }
        public IOpportunitiesRepository Opportunities { get; }
        public ITargetRepository Target { get; }
        public IInvoiceRepository Invoice { get; }
        public IPreInvoiceRepository PreInvoice { get; }
        public ICompetitorRepository Competitor { get; }
        public IServicesRepository Services { get; }
        public ISaleContractRepository SaleContract { get; }
        public IProductCategoryRepository ProductCategory { get; }
        public IProductsRepository Products { get; }
        public IAnalysisRepository Analysis { get; }
        public IReportRepository Report { get; }
        public IConfirmationRepository Confirmation { get; }
        public ISupplierRepository Supplier { get; }
        public IBuyOrderRepository BuyOrder { get; }
        public IProjectRepository Project { get; }
        public IActivitiesRepository Activities { get; }
        public IPasswordComplexityRepository PasswordComplexity { get; }
        public IProgramPartRepository ProgramPart { get; }
        public IPersonsRepository Persons { get; }
        public IApplicationRoleRepository ApplicationRoles { get; }
        public IPersonnelWithRolesRepository PersonnelWithRoles { get; }
        public IMeetingPlacesRepository MeetingPlaces { get; }
        public IArchiveRepository Archive { get; }
        public IComPublicTitlesRepository ComPublicTitles { get; }
        public IComPublicRepository ComPublics { get; }
        public IApplicationSettingsRepository ApplicationSettings { get; }
        public IServiceRepository Service { get; }
        public IEntitiesRepository Entities { get; }
        public ISupportContractRepository SupportContract { get; }
        int Save();
    }
}
