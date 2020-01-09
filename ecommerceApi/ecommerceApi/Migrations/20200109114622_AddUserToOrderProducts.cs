using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ecommerceApi.Migrations
{
    public partial class AddUserToOrderProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "OrderProducts",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "AspNetUsers",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_UserId",
                table: "OrderProducts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderProducts_AspNetUsers_UserId",
                table: "OrderProducts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderProducts_AspNetUsers_UserId",
                table: "OrderProducts");

            migrationBuilder.DropIndex(
                name: "IX_OrderProducts_UserId",
                table: "OrderProducts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "OrderProducts");

            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);
        }
    }
}
