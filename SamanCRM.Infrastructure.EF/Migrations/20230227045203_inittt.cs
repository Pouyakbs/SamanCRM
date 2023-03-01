using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SamanCRM.Infrastructure.EF.Migrations
{
    public partial class inittt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tb-Entities",
                columns: table => new
                {
                    EntitiesID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchID = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ModifiedByUser = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    SystemName = table.Column<string>(type: "nvarchar(70)", nullable: true),
                    DisplayName = table.Column<string>(type: "nvarchar(70)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb-Entities", x => x.EntitiesID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tb-Entities_EntitiesID_BranchID",
                table: "Tb-Entities",
                columns: new[] { "EntitiesID", "BranchID" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tb-Entities");
        }
    }
}
