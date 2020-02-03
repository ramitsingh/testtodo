using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TodoList.API.Repository;

namespace TodoList.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string AllowAll = "AllowAll";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITodoListRepository, TodoListDataStore>();

            services.AddCors(options =>
            {
                options.AddPolicy(AllowAll, p =>
                {
                    p.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.UseCors(builder => builder.WithOrigins("http://localhost:4200") // WithOrigins("http://localhost:4200")
            //                  .AllowAnyMethod()
            //                  .AllowAnyOrigin()
            //                  .AllowCredentials()
            //                  .AllowAnyHeader());
            app.UseCors(AllowAll);
            //app.UsePreflightRequestHandler();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler();
            }

            app.UseStatusCodePages();
            // TODO - currently only allowed for angular 4200 port
            //app.UseCors("AllowAll");

            app.UseHttpsRedirection();
            app.UseMvc();
            
        }
    }
}
