using Microsoft.EntityFrameworkCore.Migrations;

namespace SamanCRM.Infrastructure.EF.Migrations
{
    public partial class initttt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentName",
                table: "Tb-Payment");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedTo",
                table: "Tb-SaleContract",
                type: "nvarchar(35)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(35)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RelatedToInput",
                table: "Tb-SaleContract",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "RelatedToInput",
                table: "Tb-PreInvoice",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(35)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RelatedTo",
                table: "Tb-PreInvoice",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(35)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RelatedTo",
                table: "Tb-Payment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RelatedToInput",
                table: "Tb-Payment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "RelatedToInput",
                table: "Tb-Invoice",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(35)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RelatedTo",
                table: "Tb-Invoice",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(35)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RelatedToInput",
                table: "Tb-ActivitiesDetail",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RelatedTo",
                table: "Tb-ActivitiesDetail",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RelatedToInput",
                table: "Tb-SaleContract");

            migrationBuilder.DropColumn(
                name: "RelatedTo",
                table: "Tb-Payment");

            migrationBuilder.DropColumn(
                name: "RelatedToInput",
                table: "Tb-Payment");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedTo",
                table: "Tb-SaleContract",
                type: "nvarchar(35)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(35)");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedToInput",
                table: "Tb-PreInvoice",
                type: "nvarchar(35)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedTo",
                table: "Tb-PreInvoice",
                type: "nvarchar(35)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "ParentName",
                table: "Tb-Payment",
                type: "nvarchar(30)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RelatedToInput",
                table: "Tb-Invoice",
                type: "nvarchar(35)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedTo",
                table: "Tb-Invoice",
                type: "nvarchar(35)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedToInput",
                table: "Tb-ActivitiesDetail",
                type: "nvarchar(40)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "RelatedTo",
                table: "Tb-ActivitiesDetail",
                type: "nvarchar(40)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
