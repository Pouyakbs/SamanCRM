using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SamanCRM.Infrastructure.EF.Migrations
{
    public partial class initt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tb-Service",
                columns: table => new
                {
                    ServiceID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, comment: "تاریخ ایجاد"),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false, comment: "تاریخ تغییر"),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true, comment: "کاربر ایجاد کننده"),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true, comment: "کاربر ویرایش کننده"),
                    Name = table.Column<string>(type: "nvarchar(60)", nullable: true, comment: "نام خدمت"),
                    Limitation = table.Column<int>(type: "int", nullable: false, comment: "حد مجاز"),
                    Price = table.Column<double>(type: "float(53)", nullable: false, comment: "قیمت"),
                    MoneyUnit = table.Column<string>(type: "nvarchar(50)", nullable: true, comment: "واحد پول"),
                    ServiceUnit = table.Column<string>(type: "nvarchar(50)", nullable: true, comment: "واحد ارائه خدمات"),
                    Desc = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Service", x => x.ServiceID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tb-Service");
        }
    }
}
