using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ABReact.Data;
using ABReact.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ABReact
{
    public class Program
    {
        public static void Main(string[] args){
            //public static async Task Main(string[] args)
            //{

            //var host = CreateHostBuilder(args).Build();
            //try
            //{
            //    var scope = host.Services.CreateScope();

            //    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            //    await ctx.Database.EnsureCreatedAsync();

            //    if (!ctx.Users.Any())
            //    {
            //        for (int i = 0; i < 20; i++)
            //        {
            //            DateTime created = RandomDay(new DateTime(2010, 1, 1), DateTime.Now);
            //            DateTime lastActivity = RandomDay(created, new DateTime(2021, 12, 1));
            //            var user = new User
            //            {
            //                Created = created,
            //                LastActivity = lastActivity,

            //            };

            //            await ctx.AddAsync(user);
            //            await ctx.SaveChangesAsync();
            //        }

            //    }

            //}
            //catch (Exception e)
            //{
            //    Console.WriteLine(e.Message);
            //}
            //await host.RunAsync();
            CreateHostBuilder(args).Build().Run();
        }
        private static DateTime RandomDay(DateTime start, DateTime end)
        {
            int range = 0;
            Random gen = new Random();
            
            if ((end - start).Days != 0)
            {
                range = (end - start).Days;
            }
            else
            {
                range = 7;
            }
            return start.AddDays(gen.Next(range));
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
