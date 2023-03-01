using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Infrastructure.EF
{
    public static class DependencyInjection
    {
        public static void AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DemoContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.UseSqlServer(
                        configuration.GetConnectionString("SamanCRM"));
            });
            services.AddDbContext<LogsContext>(options =>
            {
                options.EnableSensitiveDataLogging();
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.UseSqlServer(
                        configuration.GetConnectionString("SamanCRMLogs"));
            });
        }
    }
}