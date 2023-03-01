using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SamanCRM.Infrastructure.EF;
using ServiceHost.Data;
using ServiceHost.Logging.Interface;
using System;
using System.Data;
using System.Threading.Tasks;

namespace ServiceHost.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ILogRepository))]
    public class BackupController : ControllerBase
    {
        private readonly DemoContext context;
        private readonly IConfiguration configuration;

        public BackupController(DemoContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration.GetSection("ConnectionStrings");
        }
        [HttpPost]
        public async Task<IActionResult> BackupAll(string address)
        {
            var database = configuration.GetSection("DatabaseName").Value;
            DateTime date = DateTime.Now;
            await using var connection = context.Database.GetDbConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("BackUpAll", (SqlConnection)connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            command.Parameters.Add("@DataBase", SqlDbType.NVarChar).Value = database;
            command.Parameters.Add("@Address", SqlDbType.NVarChar).Value = address;
            command.Parameters.Add("@date", SqlDbType.DateTime).Value = date;

            await command.ExecuteNonQueryAsync();

            return Ok("با موفقیت انجام شد");

        }
    }
}