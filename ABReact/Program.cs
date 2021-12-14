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
        public static async Task Main(string[] args)
        {

            var host = CreateHostBuilder(args).Build();
            try
            {
                var scope = host.Services.CreateScope();

                var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                List<User> users = new List<User>();

                await ctx.Database.EnsureCreatedAsync();

                if (!ctx.Users.Any())
                {
                    for (int i = 0; i < 20; i++)
                    {
                        users.Add(new User
                        {
                            UserId = i + 1,
                            Created = RandomDay(new DateTime(2010, 1, 1), new DateTime(2018, 1, 1)),
                            LastActivity = RandomDay(new DateTime(2019, 1, 1), new DateTime(2021, 1, 1)),
                        });
                    }

                    await ctx.AddRangeAsync(users);
                    await ctx.SaveChangesAsync();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            await host.RunAsync();
            //CreateHostBuilder(args).Build().Run();
        }
        private static DateTime RandomDay(DateTime start, DateTime end)
        {
            Random gen = new Random();
            //DateTime start = new DateTime(2010, 1, 1);
            //int range = (DateTime.Today - start).Days;
            int range = (end - start).Days;
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
