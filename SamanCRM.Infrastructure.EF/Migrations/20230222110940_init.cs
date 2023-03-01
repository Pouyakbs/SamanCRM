using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SamanCRM.Infrastructure.EF.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    NormalizedName = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Account",
                columns: table => new
                {
                    AccountID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AccountGuid = table.Column<Guid>(nullable: false),
                    NickName = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    AccountName = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    AccountType = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Fax = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ContactFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Emails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Attractiveness = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AnotherName = table.Column<string>(nullable: true),
                    Campaign = table.Column<string>(nullable: true),
                    Ownership = table.Column<string>(nullable: true),
                    Industry = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    SubIndustry = table.Column<string>(nullable: true),
                    RefferedBy = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Member = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    NationalNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    EcoCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    SubNumber = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    GeographyCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherGeographicalArea = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherCountry = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Otherstate = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Othercity = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OtherPostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Otheraddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Otherlatitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Otherlongitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Facebook = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Twitter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkedIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Blog = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidityStatus = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ValidityType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ExpireTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    ValiditySource = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ValidityLimit = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    ValiditySourceDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SaleDiscount = table.Column<double>(type: "float(53)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Account", x => x.AccountID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Analysis",
                columns: table => new
                {
                    AnalysisID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AnalysisGuid = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    AnalysisArea = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Analysis", x => x.AnalysisID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Archive",
                columns: table => new
                {
                    ArchiveID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ArchiveGuid = table.Column<Guid>(nullable: false),
                    EntityType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    FileName = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    FileFormat = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    RecordID = table.Column<int>(type: "int", nullable: false),
                    File = table.Column<byte[]>(type: "image", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Archive", x => x.ArchiveID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Branch",
                columns: table => new
                {
                    BranchID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    BranchGuid = table.Column<Guid>(nullable: false),
                    BranchName = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    BranchAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BranchPhoneNum = table.Column<string>(type: "nvarchar(13)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Branch", x => x.BranchID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-BuyOrder",
                columns: table => new
                {
                    OrderID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OrderGuid = table.Column<Guid>(nullable: false),
                    SupplierID = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Number = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Customer = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ForOpportunity = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MoneyUnit = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    Totalprice = table.Column<double>(type: "float(53)", nullable: false),
                    Discount = table.Column<double>(type: "float(53)", nullable: false),
                    Subset = table.Column<double>(type: "float(53)", nullable: false),
                    Transport = table.Column<double>(type: "float(53)", nullable: false),
                    TransportTax = table.Column<double>(type: "float(53)", nullable: false),
                    TaxRate = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Tax = table.Column<double>(type: "float(53)", nullable: false),
                    TotalAmount = table.Column<double>(type: "float(53)", nullable: false),
                    ProductList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherExpenses = table.Column<double>(type: "float(53)", nullable: false),
                    ProductSubTotal = table.Column<double>(type: "float(53)", nullable: false),
                    TotalCount = table.Column<double>(type: "float(53)", nullable: false),
                    ServiceSubTotal = table.Column<double>(type: "float(53)", nullable: false),
                    CustomerReminder = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    MaturityDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    SupplierReqNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    TrackingNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ProductSendMethod = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProductSendType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PhasedDelivery = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PaymentStatus = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PaymentDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Terms = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Files = table.Column<byte[]>(type: "image", nullable: true),
                    BillSendGeoLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillCountry = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BillState = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BillCity = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BillPostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    BillAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    BillLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdSendGeoLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdCountry = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProdState = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProdCity = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProdPostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ProdAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ProdLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdLong = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-BuyOrder", x => x.OrderID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Clues",
                columns: table => new
                {
                    ClueID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ClueGuid = table.Column<Guid>(nullable: false),
                    Type = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    NickName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    AccountName = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    ClueSource = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ContactFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Emails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Segment = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Attractiveness = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ClueCampaign = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Industry = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    SubIndustry = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    RefferedBy = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    NationalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    EcoCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    SubNumber = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    GeographyCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Long = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherGeographyCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherCountry = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OtherState = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OtherCity = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OtherPostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    OtherAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Facebook = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Twitter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkedIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Blog = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Clues", x => x.ClueID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Company",
                columns: table => new
                {
                    CompanyID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CompanyGuid = table.Column<Guid>(nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    CompanyTitle = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    SubNumber = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    EcoCode = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    NationalNum = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    OfficePhone = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    Fax = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    BankAccNum = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    BankCardNum = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ShebaNum = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    BankName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AccountOwner = table.Column<string>(type: "nvarchar(35)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Company", x => x.CompanyID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Competitor",
                columns: table => new
                {
                    CompetitorID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CompetitorGuid = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    CeoName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ContactFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityField = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActivityExp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Strengths = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WeakPoints = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Competitor", x => x.CompetitorID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Confirmation",
                columns: table => new
                {
                    ConfirmationID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ConfirmationGuid = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ApprovalModel = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ApprovalType = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ConfirmLevel = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Seconder = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Confirmation", x => x.ConfirmationID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Connections",
                columns: table => new
                {
                    ConnectionsID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    CreatedByUser = table.Column<string>(nullable: true),
                    ModifiedByUser = table.Column<string>(nullable: true),
                    ConnectionsGuid = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    ActiveConnection = table.Column<bool>(type: "bit", nullable: false),
                    MaduleName = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    RecordType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Condition = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ConditionAmount = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    SendMessage = table.Column<bool>(type: "bit", nullable: false),
                    SendEmail = table.Column<bool>(type: "bit", nullable: false),
                    MessageTitle = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    EmailTitle = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Frame = table.Column<string>(type: "nvarchar(40)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Connections", x => x.ConnectionsID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-MeetingPlaces",
                columns: table => new
                {
                    PlaceID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PlaceGuid = table.Column<Guid>(nullable: false),
                    PlaceName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    RoomCapacity = table.Column<int>(type: "int", nullable: false),
                    LapTop = table.Column<bool>(type: "bit", nullable: false),
                    Monitor = table.Column<bool>(type: "bit", nullable: false),
                    Internet = table.Column<bool>(type: "bit", nullable: false),
                    Network = table.Column<bool>(type: "bit", nullable: false),
                    MicroPhone = table.Column<bool>(type: "bit", nullable: false),
                    Projector = table.Column<bool>(type: "bit", nullable: false),
                    WhiteBoard = table.Column<bool>(type: "bit", nullable: false),
                    CoolingAndHeating = table.Column<bool>(type: "bit", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-MeetingPlaces", x => x.PlaceID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-PasswordComplexity",
                columns: table => new
                {
                    PasswordComplexityID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PasswordComplexityGuid = table.Column<Guid>(nullable: false),
                    PassLeastChar = table.Column<int>(type: "int", nullable: false),
                    PassMaxChar = table.Column<int>(type: "int", nullable: false),
                    UseChar = table.Column<string>(type: "nchar(5)", nullable: false),
                    UseSpecialChar = table.Column<string>(type: "nchar(5)", nullable: false),
                    UseDigit = table.Column<string>(type: "nchar(5)", nullable: false),
                    SpecialChar = table.Column<string>(type: "nchar(5)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-PasswordComplexity", x => x.PasswordComplexityID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Payment",
                columns: table => new
                {
                    PaymentID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PaymentGuid = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Number = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Associated = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Direction = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    ForecastedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    MoneyUnit = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    DoneDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Amount = table.Column<double>(type: "float(53)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CustomerSMS = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Customer = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ReferenceNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PaymentCompany = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Branch = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Fund = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Assignedcount = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Remaincount = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Factor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Payment", x => x.PaymentID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Personnel",
                columns: table => new
                {
                    PersonnelID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PersonnelGuid = table.Column<Guid>(nullable: false),
                    NickName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    orgPost = table.Column<int>(nullable: false),
                    contactFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentID = table.Column<int>(nullable: false),
                    InternalNum = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    workingSection = table.Column<string>(nullable: true),
                    Username = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    ManagerName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    WorkingUnit = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "date", nullable: false),
                    NationalCode = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    GeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Personnel", x => x.PersonnelID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-ProductCategory",
                columns: table => new
                {
                    CategoryID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CategoryGuid = table.Column<Guid>(nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    ParentID = table.Column<int>(nullable: false),
                    ParentCategory = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    User = table.Column<string>(nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-ProductCategory", x => x.CategoryID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-ProgramPart",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentID = table.Column<int>(type: "int", nullable: false),
                    SystemName = table.Column<string>(type: "nvarchar(300)", nullable: true),
                    DisplayName = table.Column<string>(type: "nvarchar(120)", nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    RouteName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BreadCrumbs = table.Column<string>(nullable: true),
                    RoleID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-ProgramPart", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Report",
                columns: table => new
                {
                    ReportID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ReportGuid = table.Column<Guid>(nullable: false),
                    ReportName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Display = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    ReportModule = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AuditTable = table.Column<string>(type: "nvarchar(5)", nullable: false),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ReportRange = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ReportFormat = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    InternalDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublicDesc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Report", x => x.ReportID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: true),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-RoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Roles",
                columns: table => new
                {
                    RoleID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    RoleName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ParentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Roles", x => x.RoleID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-SaleContract",
                columns: table => new
                {
                    ContractID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ContractGuid = table.Column<Guid>(nullable: false),
                    ContractTitle = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    RelatedTo = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Customer = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    SuccessRate = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    SaleOpportunity = table.Column<string>(nullable: true),
                    ReferenceCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ContractType = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ContractManager = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MoneyUnit = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    Total = table.Column<double>(type: "float(53)", nullable: false),
                    Discount = table.Column<double>(type: "float(53)", nullable: false),
                    SubTotal = table.Column<double>(type: "float(53)", nullable: false),
                    OtherAdditions = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    Shipment = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    ShipmentTax = table.Column<double>(type: "float(53)", nullable: false),
                    Tax = table.Column<double>(type: "float(53)", nullable: false),
                    InsuranceDepositAmount = table.Column<double>(nullable: false),
                    GoodJobDeposit = table.Column<double>(type: "float(53)", nullable: false),
                    TotalCount = table.Column<double>(type: "float(53)", nullable: false),
                    GuaranteeObligations = table.Column<double>(nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerSignDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CompanySignDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    InvoiceSenderCompany = table.Column<string>(nullable: true),
                    InvoicedTill = table.Column<string>(nullable: true),
                    InvoiceSendPeriod = table.Column<string>(nullable: true),
                    InvoiceSendType = table.Column<string>(nullable: true),
                    RememberExtentionDate = table.Column<DateTime>(nullable: false),
                    ForecastSale = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-SaleContract", x => x.ContractID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Target",
                columns: table => new
                {
                    TargetID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TargetGuid = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    OfficePhone = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    PhoneNum = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    HomeNum = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    OtherPhoneNum = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Unit = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Fax = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    AccountName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    SecretaryName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    CallMe = table.Column<string>(type: "nvarchar(5)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    GeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    MainAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Long = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Target", x => x.TargetID);
                });

            migrationBuilder.CreateTable(
                name: "Tb-UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-UserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tb-UserLogins",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: true),
                    ProviderKey = table.Column<string>(nullable: true),
                    ProviderDisplayName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-UserLogins", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Tb-UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-UserRoles", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Tb-UserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-UserTokens", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Persons",
                columns: table => new
                {
                    PersonID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PersonGuid = table.Column<Guid>(nullable: false),
                    NickName = table.Column<string>(nullable: true),
                    PersonName = table.Column<string>(type: "nvarchar(30)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(30)", nullable: false),
                    Segment = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    AccountName = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ClueSource = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ContactFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Section = table.Column<string>(type: "nvarchar(13)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ManagerName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    SecretaryName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BirthDate = table.Column<DateTime>(type: "date", nullable: false),
                    NationalCode = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    GeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherGeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherCountry = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherCity = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    OtherState = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    OtherLatitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherLongitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherPostalCode = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkedIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Twitter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FaceBook = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Blog = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Persons", x => x.PersonID);
                    table.ForeignKey(
                        name: "FK_Tb-Persons_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Supplier",
                columns: table => new
                {
                    SupplierID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    SupplierGuid = table.Column<Guid>(nullable: false),
                    NickName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ContactFields = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Emails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Attractiveness = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    SupplierNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Industry = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    SubIndustry = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    EcoCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    NationalNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    SubNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    BillSendGeoLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillCountry = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BillState = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BillCity = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    BillPostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    BillAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    BillLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BillLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdSendGeoLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdCountry = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProdState = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProdCity = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ProdPostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ProdAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ProdLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProdLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkedIn = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Instagram = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Blog = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    FaceBook = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Twitter = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    AccountID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Supplier", x => x.SupplierID);
                    table.ForeignKey(
                        name: "FK_Tb-Supplier_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Campaign",
                columns: table => new
                {
                    CampaignID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CampaignGuid = table.Column<Guid>(nullable: false),
                    CampaignName = table.Column<string>(type: "nvarchar(40)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    RepetitionRate = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ParentID = table.Column<int>(nullable: false),
                    MoneyUnit = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    ReadEmails = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Budget = table.Column<double>(type: "float(53)", nullable: false),
                    RealCost = table.Column<double>(type: "float(53)", nullable: false),
                    ExpectedCost = table.Column<double>(type: "float(53)", nullable: false),
                    ExpectedIncome = table.Column<double>(type: "float(53)", nullable: false),
                    ExpectedAnswer = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Target = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CluesClueID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Campaign", x => x.CampaignID);
                    table.ForeignKey(
                        name: "FK_Tb-Campaign_Tb-Clues_CluesClueID",
                        column: x => x.CluesClueID,
                        principalTable: "Tb-Clues",
                        principalColumn: "ClueID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Project",
                columns: table => new
                {
                    ProjectID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ProjectGuid = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ProjectType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Importance = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MainSendGeoLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    MainAddress = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Long = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountantNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Log = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountID = table.Column<int>(nullable: false),
                    ClueID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Project", x => x.ProjectID);
                    table.ForeignKey(
                        name: "FK_Tb-Project_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-Project_Tb-Clues_ClueID",
                        column: x => x.ClueID,
                        principalTable: "Tb-Clues",
                        principalColumn: "ClueID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Activities",
                columns: table => new
                {
                    ActivityID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ActivityGuid = table.Column<Guid>(nullable: false),
                    EntityType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ActivityType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PersonnelID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Activities", x => x.ActivityID);
                    table.ForeignKey(
                        name: "FK_Tb-Activities_Tb-Personnel_PersonnelID",
                        column: x => x.PersonnelID,
                        principalTable: "Tb-Personnel",
                        principalColumn: "PersonnelID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-ApplicationSettings",
                columns: table => new
                {
                    SettingID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    VariableName = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PersonnelID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-ApplicationSettings", x => x.SettingID);
                    table.ForeignKey(
                        name: "FK_Tb-ApplicationSettings_Tb-Personnel_PersonnelID",
                        column: x => x.PersonnelID,
                        principalTable: "Tb-Personnel",
                        principalColumn: "PersonnelID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-User",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserGuid = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    NormalizedUserName = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    DisabledEndTime = table.Column<DateTimeOffset>(nullable: true),
                    isDisabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    IsRemoved = table.Column<bool>(nullable: false),
                    UserIP = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    RefreshToken = table.Column<string>(nullable: true),
                    PassExpiryTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    PassActiveDays = table.Column<int>(type: "int", nullable: false),
                    PassiveExpiryTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    PassivePermitDays = table.Column<int>(type: "int", nullable: false),
                    PassIncorrectNum = table.Column<int>(type: "int", nullable: false),
                    RefreshTokenExpiryTime = table.Column<DateTime>(nullable: false),
                    PersonnelID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-User", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Tb-User_Tb-Personnel_PersonnelID",
                        column: x => x.PersonnelID,
                        principalTable: "Tb-Personnel",
                        principalColumn: "PersonnelID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Products",
                columns: table => new
                {
                    ProductID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ProductGuid = table.Column<Guid>(nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Brand = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    ProductCode = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    MoneyUnit = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    SalePrice = table.Column<double>(type: "float(53)", nullable: false),
                    PurchasePrice = table.Column<double>(type: "float(53)", nullable: false),
                    MainMeasurement = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    SecondMeasurement = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    HoursCount = table.Column<int>(type: "int", nullable: false),
                    BatchNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    SerialNum = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    LatNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ValidityDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ProductURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Barcode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceType = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Saleable = table.Column<bool>(type: "bit", nullable: false),
                    NeedProductReturn = table.Column<bool>(type: "bit", nullable: false),
                    Length = table.Column<double>(type: "float(53)", nullable: false),
                    Width = table.Column<double>(type: "float(53)", nullable: false),
                    Height = table.Column<double>(type: "float(53)", nullable: false),
                    NetWeight = table.Column<double>(type: "float(53)", nullable: false),
                    GrossWeight = table.Column<double>(type: "float(53)", nullable: false),
                    PocketNum = table.Column<int>(type: "int", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumPerUnit = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    StoreInventory = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    OrderRate = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    AvailableForSale = table.Column<string>(nullable: true),
                    SafetyStock = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    Pursuer = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    CategoryID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Products", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK_Tb-Products_Tb-ProductCategory_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Tb-ProductCategory",
                        principalColumn: "CategoryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-ComPublicTitles",
                columns: table => new
                {
                    TitleID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ProgramPartID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-ComPublicTitles", x => x.TitleID);
                    table.ForeignKey(
                        name: "FK_Tb-ComPublicTitles_Tb-ProgramPart_ProgramPartID",
                        column: x => x.ProgramPartID,
                        principalTable: "Tb-ProgramPart",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Tb-PersonnelRole",
                columns: table => new
                {
                    RoleID = table.Column<int>(nullable: false),
                    PersonnelID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-PersonnelRole", x => new { x.PersonnelID, x.RoleID });
                    table.ForeignKey(
                        name: "FK_Tb-PersonnelRole_Tb-Personnel_PersonnelID",
                        column: x => x.PersonnelID,
                        principalTable: "Tb-Personnel",
                        principalColumn: "PersonnelID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-PersonnelRole_Tb-Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Tb-Roles",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-RoleProgramPart",
                columns: table => new
                {
                    RoleID = table.Column<int>(nullable: false),
                    ProgramPartID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-RoleProgramPart", x => new { x.ProgramPartID, x.RoleID });
                    table.ForeignKey(
                        name: "FK_Tb-RoleProgramPart_Tb-ProgramPart_ProgramPartID",
                        column: x => x.ProgramPartID,
                        principalTable: "Tb-ProgramPart",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-RoleProgramPart_Tb-Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Tb-Roles",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-AccountCampaign",
                columns: table => new
                {
                    CampaignID = table.Column<int>(nullable: false),
                    AccountID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-AccountCampaign", x => new { x.AccountID, x.CampaignID });
                    table.ForeignKey(
                        name: "FK_Tb-AccountCampaign_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-AccountCampaign_Tb-Campaign_CampaignID",
                        column: x => x.CampaignID,
                        principalTable: "Tb-Campaign",
                        principalColumn: "CampaignID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-PersonsCampaign",
                columns: table => new
                {
                    PersonID = table.Column<int>(nullable: false),
                    CampaignID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-PersonsCampaign", x => new { x.PersonID, x.CampaignID });
                    table.ForeignKey(
                        name: "FK_Tb-PersonsCampaign_Tb-Campaign_CampaignID",
                        column: x => x.CampaignID,
                        principalTable: "Tb-Campaign",
                        principalColumn: "CampaignID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-PersonsCampaign_Tb-Persons_PersonID",
                        column: x => x.PersonID,
                        principalTable: "Tb-Persons",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-ActivitiesDetail",
                columns: table => new
                {
                    DetailID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ActivityGuid = table.Column<Guid>(nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    RelatedTo = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    RelatedToInput = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    InternalNum = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Date = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    Time = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Duration = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Meetinglocation = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    UserSMS = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    GuestsSMS = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    SoftwareReminder = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SendInvitation = table.Column<bool>(type: "bit", nullable: false),
                    GuestFullName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(155)", nullable: true),
                    MeetingPlace = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    Deadline = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    StartTime = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Customer = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    GroupAnnounce = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    ActivityID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-ActivitiesDetail", x => x.DetailID);
                    table.ForeignKey(
                        name: "FK_Tb-ActivitiesDetail_Tb-Activities_ActivityID",
                        column: x => x.ActivityID,
                        principalTable: "Tb-Activities",
                        principalColumn: "ActivityID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-BranchUser",
                columns: table => new
                {
                    BranchID = table.Column<int>(nullable: false),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-BranchUser", x => new { x.UserID, x.BranchID });
                    table.ForeignKey(
                        name: "FK_Tb-BranchUser_Tb-Branch_BranchID",
                        column: x => x.BranchID,
                        principalTable: "Tb-Branch",
                        principalColumn: "BranchID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-BranchUser_Tb-User_UserID",
                        column: x => x.UserID,
                        principalTable: "Tb-User",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Opportunities",
                columns: table => new
                {
                    OpportunityID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OpportunityGuid = table.Column<Guid>(nullable: false),
                    OpportunityName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    MoneyUnit = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    AccountName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PriceBased = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    SaleProcess = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Price = table.Column<double>(type: "float(53)", nullable: false),
                    SuccessProssibility = table.Column<string>(type: "nvarchar(15)", nullable: true),
                    ExpectedPrice = table.Column<double>(type: "float(53)", nullable: false),
                    SaleDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ClueSource = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ProductList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Campaign = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Project = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    NextStep = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ReasonofLoss = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SaleForecast = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    SendingInvoiceTerms = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PayTermEndDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClueID = table.Column<int>(nullable: false),
                    AccountID = table.Column<int>(nullable: false),
                    ApplicationUserUserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Opportunities", x => x.OpportunityID);
                    table.ForeignKey(
                        name: "FK_Tb-Opportunities_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-Opportunities_Tb-User_ApplicationUserUserID",
                        column: x => x.ApplicationUserUserID,
                        principalTable: "Tb-User",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tb-Opportunities_Tb-Clues_ClueID",
                        column: x => x.ClueID,
                        principalTable: "Tb-Clues",
                        principalColumn: "ClueID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Services",
                columns: table => new
                {
                    ServiceID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ServiceGuid = table.Column<Guid>(nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    ServiceNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    TeamName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ServiceType = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    FirstLayerUser = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    SecondLayerUser = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    CustomerReason = table.Column<string>(type: "nvarchar(155)", nullable: true),
                    ServiceReason = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Intensity = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    AnnounceChannel = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    ReceiveDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    InstallLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeviceLocInput = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Long = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FileTitle = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Files = table.Column<byte[]>(type: "image", nullable: true),
                    InternalDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Solution = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    AccountID = table.Column<int>(nullable: false),
                    PersonsID = table.Column<int>(nullable: false),
                    ProductID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Services", x => x.ServiceID);
                    table.ForeignKey(
                        name: "FK_Tb-Services_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-Services_Tb-Persons_PersonsID",
                        column: x => x.PersonsID,
                        principalTable: "Tb-Persons",
                        principalColumn: "PersonID");
                    table.ForeignKey(
                        name: "FK_Tb-Services_Tb-Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Tb-Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-SupplierProducts",
                columns: table => new
                {
                    ProductID = table.Column<int>(nullable: false),
                    SupplierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-SupplierProducts", x => new { x.ProductID, x.SupplierID });
                    table.ForeignKey(
                        name: "FK_Tb-SupplierProducts_Tb-Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Tb-Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-SupplierProducts_Tb-Supplier_SupplierID",
                        column: x => x.SupplierID,
                        principalTable: "Tb-Supplier",
                        principalColumn: "SupplierID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-ComPublic",
                columns: table => new
                {
                    ComPublicID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ParentID = table.Column<int>(type: "int", nullable: false),
                    ProgramPartID = table.Column<int>(nullable: false),
                    ComPublicTitleID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-ComPublic", x => x.ComPublicID);
                    table.ForeignKey(
                        name: "FK_Tb-ComPublic_Tb-ComPublicTitles_ComPublicTitleID",
                        column: x => x.ComPublicTitleID,
                        principalTable: "Tb-ComPublicTitles",
                        principalColumn: "TitleID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-ComPublic_Tb-ProgramPart_ProgramPartID",
                        column: x => x.ProgramPartID,
                        principalTable: "Tb-ProgramPart",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Tb-OpportunitiesCampaign",
                columns: table => new
                {
                    CampaignID = table.Column<int>(nullable: false),
                    OpportunitiesID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-OpportunitiesCampaign", x => new { x.OpportunitiesID, x.CampaignID });
                    table.ForeignKey(
                        name: "FK_Tb-OpportunitiesCampaign_Tb-Campaign_CampaignID",
                        column: x => x.CampaignID,
                        principalTable: "Tb-Campaign",
                        principalColumn: "CampaignID");
                    table.ForeignKey(
                        name: "FK_Tb-OpportunitiesCampaign_Tb-Opportunities_OpportunitiesID",
                        column: x => x.OpportunitiesID,
                        principalTable: "Tb-Opportunities",
                        principalColumn: "OpportunityID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-OpportunitiesProducts",
                columns: table => new
                {
                    OpportunitiesID = table.Column<int>(nullable: false),
                    ProductsID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-OpportunitiesProducts", x => new { x.OpportunitiesID, x.ProductsID });
                    table.ForeignKey(
                        name: "FK_Tb-OpportunitiesProducts_Tb-Opportunities_OpportunitiesID",
                        column: x => x.OpportunitiesID,
                        principalTable: "Tb-Opportunities",
                        principalColumn: "OpportunityID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-OpportunitiesProducts_Tb-Products_ProductsID",
                        column: x => x.ProductsID,
                        principalTable: "Tb-Products",
                        principalColumn: "ProductID");
                });

            migrationBuilder.CreateTable(
                name: "Tb-PreInvoice",
                columns: table => new
                {
                    PreInvoiceID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    PreInvoiceGuid = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PreInvoiceNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PreInvoiceLevel = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Customer = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PreInvoiceDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    RelatedTo = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    RelatedToInput = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    ValidityDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    InvoiceState = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Project = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MoneyUnit = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    Total = table.Column<double>(type: "float(53)", nullable: false),
                    Discount = table.Column<double>(type: "float(53)", nullable: false),
                    SubTotal = table.Column<double>(type: "float(53)", nullable: false),
                    OtherAdditions = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    Shipment = table.Column<double>(type: "float(53)", nullable: false),
                    ShipmentTax = table.Column<double>(type: "float(53)", nullable: false),
                    ShipmentTaxPercentage = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Tax = table.Column<double>(type: "float(53)", nullable: false),
                    InsuranceAmount = table.Column<double>(type: "float(53)", nullable: false),
                    InsuranceAmountPercentage = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    GoodJobDeposit = table.Column<double>(type: "float(53)", nullable: false),
                    GoodJobDepositPercentage = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    TotalCount = table.Column<double>(type: "float(53)", nullable: false),
                    TotalNum = table.Column<double>(type: "float(53)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerSMS = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    ProductSendMethod = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    PaymentConditions = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    ProductSendType = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    InternalVerify = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    InternalVerifyProblems = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PreInvoiceSenderCompany = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PreInvoicePrintFrame = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    GeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Long = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherGeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherCountry = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherState = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherCity = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherPostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherAddress = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    OtherLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidityLimit = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TotalReceivable = table.Column<double>(type: "float(53)", nullable: false),
                    AccountID = table.Column<int>(nullable: false),
                    OpportunitiesID = table.Column<int>(nullable: false),
                    PersonsID = table.Column<int>(nullable: false),
                    ProjectID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-PreInvoice", x => x.PreInvoiceID);
                    table.ForeignKey(
                        name: "FK_Tb-PreInvoice_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-PreInvoice_Tb-Opportunities_OpportunitiesID",
                        column: x => x.OpportunitiesID,
                        principalTable: "Tb-Opportunities",
                        principalColumn: "OpportunityID");
                    table.ForeignKey(
                        name: "FK_Tb-PreInvoice_Tb-Persons_PersonsID",
                        column: x => x.PersonsID,
                        principalTable: "Tb-Persons",
                        principalColumn: "PersonID");
                    table.ForeignKey(
                        name: "FK_Tb-PreInvoice_Tb-Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Tb-Project",
                        principalColumn: "ProjectID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tb-Invoice",
                columns: table => new
                {
                    InvoiceID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    InvoiceGuid = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    InvoiceNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    RelatedTo = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    RelatedToInput = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    PreInvoiceNum = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    ReferenceCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    Project = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    MoneyUnit = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    Total = table.Column<double>(type: "float(53)", nullable: false),
                    Discount = table.Column<double>(type: "float(53)", nullable: false),
                    SubTotal = table.Column<double>(type: "float(53)", nullable: false),
                    OtherAdditions = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    Shipment = table.Column<double>(type: "float(53)", nullable: false),
                    ShipmentTax = table.Column<double>(type: "float(53)", nullable: false),
                    ShipmentTaxPercentage = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    Tax = table.Column<double>(type: "float(53)", nullable: false),
                    InsuranceAmount = table.Column<double>(type: "float(53)", nullable: false),
                    InsuranceAmountPercentage = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    GoodJobDeposit = table.Column<double>(type: "float(53)", nullable: false),
                    GoodJobDepositPercentage = table.Column<string>(type: "nvarchar(35)", nullable: true),
                    TotalCount = table.Column<double>(type: "float(53)", nullable: false),
                    Desc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerSMS = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    ProductSendMethod = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    PaymentConditions = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    ProductSendType = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    InternalVerify = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    InternalVerifyProblems = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    PreInvoiceSenderCompany = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    PreInvoicePrintFrame = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    GeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Long = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherGeographyLoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherCountry = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherState = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherCity = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherPostalCode = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    OtherAddress = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    OtherLat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OtherLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidityLimit = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TotalReceivable = table.Column<double>(type: "float(53)", nullable: false),
                    AccountID = table.Column<int>(nullable: false),
                    PersonsID = table.Column<int>(nullable: false),
                    PreInvoiceID = table.Column<int>(nullable: false),
                    ProjectID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Invoice", x => x.InvoiceID);
                    table.ForeignKey(
                        name: "FK_Tb-Invoice_Tb-Account_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Tb-Account",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-Invoice_Tb-Persons_PersonsID",
                        column: x => x.PersonsID,
                        principalTable: "Tb-Persons",
                        principalColumn: "PersonID");
                    table.ForeignKey(
                        name: "FK_Tb-Invoice_Tb-PreInvoice_PreInvoiceID",
                        column: x => x.PreInvoiceID,
                        principalTable: "Tb-PreInvoice",
                        principalColumn: "PreInvoiceID");
                    table.ForeignKey(
                        name: "FK_Tb-Invoice_Tb-Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Tb-Project",
                        principalColumn: "ProjectID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tb-PreInvoiceProducts",
                columns: table => new
                {
                    PreInvoiceID = table.Column<int>(nullable: false),
                    ProductsID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-PreInvoiceProducts", x => new { x.PreInvoiceID, x.ProductsID });
                    table.ForeignKey(
                        name: "FK_Tb-PreInvoiceProducts_Tb-PreInvoice_PreInvoiceID",
                        column: x => x.PreInvoiceID,
                        principalTable: "Tb-PreInvoice",
                        principalColumn: "PreInvoiceID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-PreInvoiceProducts_Tb-Products_ProductsID",
                        column: x => x.ProductsID,
                        principalTable: "Tb-Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb-InvoiceProducts",
                columns: table => new
                {
                    InvoiceID = table.Column<int>(nullable: false),
                    ProductID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-InvoiceProducts", x => new { x.ProductID, x.InvoiceID });
                    table.ForeignKey(
                        name: "FK_Tb-InvoiceProducts_Tb-Invoice_InvoiceID",
                        column: x => x.InvoiceID,
                        principalTable: "Tb-Invoice",
                        principalColumn: "InvoiceID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb-InvoiceProducts_Tb-Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Tb-Products",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Account_AccountID_BranchID",
                table: "Tb-Account",
                columns: new[] { "AccountID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-AccountCampaign_CampaignID",
                table: "Tb-AccountCampaign",
                column: "CampaignID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Activities_PersonnelID",
                table: "Tb-Activities",
                column: "PersonnelID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ActivitiesDetail_ActivityID",
                table: "Tb-ActivitiesDetail",
                column: "ActivityID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ActivitiesDetail_DetailID_BranchID",
                table: "Tb-ActivitiesDetail",
                columns: new[] { "DetailID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Analysis_AnalysisID_BranchID",
                table: "Tb-Analysis",
                columns: new[] { "AnalysisID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ApplicationSettings_PersonnelID",
                table: "Tb-ApplicationSettings",
                column: "PersonnelID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-BranchUser_BranchID",
                table: "Tb-BranchUser",
                column: "BranchID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-BuyOrder_OrderID_BranchID",
                table: "Tb-BuyOrder",
                columns: new[] { "OrderID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Campaign_CluesClueID",
                table: "Tb-Campaign",
                column: "CluesClueID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Campaign_CampaignID_BranchID",
                table: "Tb-Campaign",
                columns: new[] { "CampaignID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Clues_ClueID_BranchID",
                table: "Tb-Clues",
                columns: new[] { "ClueID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Company_CompanyID_BranchID",
                table: "Tb-Company",
                columns: new[] { "CompanyID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Competitor_CompetitorID_BranchID",
                table: "Tb-Competitor",
                columns: new[] { "CompetitorID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ComPublic_ComPublicTitleID",
                table: "Tb-ComPublic",
                column: "ComPublicTitleID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ComPublic_ProgramPartID",
                table: "Tb-ComPublic",
                column: "ProgramPartID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ComPublic_ComPublicID_BranchID",
                table: "Tb-ComPublic",
                columns: new[] { "ComPublicID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ComPublicTitles_ProgramPartID",
                table: "Tb-ComPublicTitles",
                column: "ProgramPartID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ComPublicTitles_TitleID_BranchID",
                table: "Tb-ComPublicTitles",
                columns: new[] { "TitleID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Confirmation_ConfirmationID_BranchID",
                table: "Tb-Confirmation",
                columns: new[] { "ConfirmationID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Connections_ConnectionsID_BranchID",
                table: "Tb-Connections",
                columns: new[] { "ConnectionsID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Invoice_AccountID",
                table: "Tb-Invoice",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Invoice_PersonsID",
                table: "Tb-Invoice",
                column: "PersonsID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Invoice_PreInvoiceID",
                table: "Tb-Invoice",
                column: "PreInvoiceID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Invoice_ProjectID",
                table: "Tb-Invoice",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Invoice_InvoiceID_BranchID",
                table: "Tb-Invoice",
                columns: new[] { "InvoiceID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-InvoiceProducts_InvoiceID",
                table: "Tb-InvoiceProducts",
                column: "InvoiceID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-MeetingPlaces_PlaceID_BranchID",
                table: "Tb-MeetingPlaces",
                columns: new[] { "PlaceID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Opportunities_AccountID",
                table: "Tb-Opportunities",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Opportunities_ApplicationUserUserID",
                table: "Tb-Opportunities",
                column: "ApplicationUserUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Opportunities_ClueID",
                table: "Tb-Opportunities",
                column: "ClueID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Opportunities_OpportunityID_BranchID",
                table: "Tb-Opportunities",
                columns: new[] { "OpportunityID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-OpportunitiesCampaign_CampaignID",
                table: "Tb-OpportunitiesCampaign",
                column: "CampaignID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-OpportunitiesProducts_ProductsID",
                table: "Tb-OpportunitiesProducts",
                column: "ProductsID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Payment_PaymentID_BranchID",
                table: "Tb-Payment",
                columns: new[] { "PaymentID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Personnel_PersonnelID_BranchID",
                table: "Tb-Personnel",
                columns: new[] { "PersonnelID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PersonnelRole_RoleID",
                table: "Tb-PersonnelRole",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Persons_AccountID",
                table: "Tb-Persons",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Persons_PersonID_BranchID",
                table: "Tb-Persons",
                columns: new[] { "PersonID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PersonsCampaign_CampaignID",
                table: "Tb-PersonsCampaign",
                column: "CampaignID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PreInvoice_AccountID",
                table: "Tb-PreInvoice",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PreInvoice_OpportunitiesID",
                table: "Tb-PreInvoice",
                column: "OpportunitiesID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PreInvoice_PersonsID",
                table: "Tb-PreInvoice",
                column: "PersonsID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PreInvoice_ProjectID",
                table: "Tb-PreInvoice",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PreInvoice_PreInvoiceID_BranchID",
                table: "Tb-PreInvoice",
                columns: new[] { "PreInvoiceID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-PreInvoiceProducts_ProductsID",
                table: "Tb-PreInvoiceProducts",
                column: "ProductsID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-ProductCategory_CategoryID_BranchID",
                table: "Tb-ProductCategory",
                columns: new[] { "CategoryID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Products_CategoryID",
                table: "Tb-Products",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Products_ProductID_BranchID",
                table: "Tb-Products",
                columns: new[] { "ProductID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Project_AccountID",
                table: "Tb-Project",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Project_ClueID",
                table: "Tb-Project",
                column: "ClueID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Project_ProjectID_BranchID",
                table: "Tb-Project",
                columns: new[] { "ProjectID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Report_ReportID_BranchID",
                table: "Tb-Report",
                columns: new[] { "ReportID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-RoleProgramPart_RoleID",
                table: "Tb-RoleProgramPart",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Roles_RoleID_BranchID",
                table: "Tb-Roles",
                columns: new[] { "RoleID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-SaleContract_ContractID_BranchID",
                table: "Tb-SaleContract",
                columns: new[] { "ContractID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Services_AccountID",
                table: "Tb-Services",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Services_PersonsID",
                table: "Tb-Services",
                column: "PersonsID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Services_ProductID",
                table: "Tb-Services",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Services_ServiceID_BranchID",
                table: "Tb-Services",
                columns: new[] { "ServiceID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Supplier_AccountID",
                table: "Tb-Supplier",
                column: "AccountID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Supplier_SupplierID_BranchID",
                table: "Tb-Supplier",
                columns: new[] { "SupplierID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-SupplierProducts_SupplierID",
                table: "Tb-SupplierProducts",
                column: "SupplierID");

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Target_TargetID_BranchID",
                table: "Tb-Target",
                columns: new[] { "TargetID", "BranchID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tb-User_PersonnelID",
                table: "Tb-User",
                column: "PersonnelID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Tb-AccountCampaign");

            migrationBuilder.DropTable(
                name: "Tb-ActivitiesDetail");

            migrationBuilder.DropTable(
                name: "Tb-Analysis");

            migrationBuilder.DropTable(
                name: "Tb-ApplicationSettings");

            migrationBuilder.DropTable(
                name: "Tb-Archive");

            migrationBuilder.DropTable(
                name: "Tb-BranchUser");

            migrationBuilder.DropTable(
                name: "Tb-BuyOrder");

            migrationBuilder.DropTable(
                name: "Tb-Company");

            migrationBuilder.DropTable(
                name: "Tb-Competitor");

            migrationBuilder.DropTable(
                name: "Tb-ComPublic");

            migrationBuilder.DropTable(
                name: "Tb-Confirmation");

            migrationBuilder.DropTable(
                name: "Tb-Connections");

            migrationBuilder.DropTable(
                name: "Tb-InvoiceProducts");

            migrationBuilder.DropTable(
                name: "Tb-MeetingPlaces");

            migrationBuilder.DropTable(
                name: "Tb-OpportunitiesCampaign");

            migrationBuilder.DropTable(
                name: "Tb-OpportunitiesProducts");

            migrationBuilder.DropTable(
                name: "Tb-PasswordComplexity");

            migrationBuilder.DropTable(
                name: "Tb-Payment");

            migrationBuilder.DropTable(
                name: "Tb-PersonnelRole");

            migrationBuilder.DropTable(
                name: "Tb-PersonsCampaign");

            migrationBuilder.DropTable(
                name: "Tb-PreInvoiceProducts");

            migrationBuilder.DropTable(
                name: "Tb-Report");

            migrationBuilder.DropTable(
                name: "Tb-RoleClaims");

            migrationBuilder.DropTable(
                name: "Tb-RoleProgramPart");

            migrationBuilder.DropTable(
                name: "Tb-SaleContract");

            migrationBuilder.DropTable(
                name: "Tb-Services");

            migrationBuilder.DropTable(
                name: "Tb-SupplierProducts");

            migrationBuilder.DropTable(
                name: "Tb-Target");

            migrationBuilder.DropTable(
                name: "Tb-UserClaims");

            migrationBuilder.DropTable(
                name: "Tb-UserLogins");

            migrationBuilder.DropTable(
                name: "Tb-UserRoles");

            migrationBuilder.DropTable(
                name: "Tb-UserTokens");

            migrationBuilder.DropTable(
                name: "Tb-Activities");

            migrationBuilder.DropTable(
                name: "Tb-Branch");

            migrationBuilder.DropTable(
                name: "Tb-ComPublicTitles");

            migrationBuilder.DropTable(
                name: "Tb-Invoice");

            migrationBuilder.DropTable(
                name: "Tb-Campaign");

            migrationBuilder.DropTable(
                name: "Tb-Roles");

            migrationBuilder.DropTable(
                name: "Tb-Products");

            migrationBuilder.DropTable(
                name: "Tb-Supplier");

            migrationBuilder.DropTable(
                name: "Tb-ProgramPart");

            migrationBuilder.DropTable(
                name: "Tb-PreInvoice");

            migrationBuilder.DropTable(
                name: "Tb-ProductCategory");

            migrationBuilder.DropTable(
                name: "Tb-Opportunities");

            migrationBuilder.DropTable(
                name: "Tb-Persons");

            migrationBuilder.DropTable(
                name: "Tb-Project");

            migrationBuilder.DropTable(
                name: "Tb-User");

            migrationBuilder.DropTable(
                name: "Tb-Account");

            migrationBuilder.DropTable(
                name: "Tb-Clues");

            migrationBuilder.DropTable(
                name: "Tb-Personnel");
        }
    }
}
