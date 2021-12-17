using Microsoft.EntityFrameworkCore.Migrations;

namespace ABReact.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LifeSpan",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LifeSpan",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
