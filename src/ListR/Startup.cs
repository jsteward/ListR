using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListR.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Mvc.Formatters.Json;

namespace ListR
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            //var connection = "Server=C06395\\SQLEXPRESS;Database=ListR;Trusted_Connection=True;;MultipleActiveResultSets=true";
            var connection =
               "Server=tcp:listr-staging.database.windows.net,1433;Initial Catalog=ListR;Persist Security Info=False;User ID=jsteward;Password=Alex1994;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            services
                .AddEntityFramework()
                .AddEntityFrameworkSqlServer()
                .AddDbContext<ListRContext>(options => options.UseSqlServer(connection));

            services.AddScoped<IListRContext, ListRContext>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
            //app.UseMvc();
        }
    }
}
