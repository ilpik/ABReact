using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using ABReact.Data;
using ABReact.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace ABReact.Services
{
    public class Calculation
    {
        private int _days = 7;

        private  AppDbContext _ctx;
        private IEnumerable<User> _usersRet;
        public Calculation(AppDbContext ctx)
        {
            _ctx = ctx;

        }

        public async Task<string> RollingRetention()
        {
            _usersRet = await _ctx.Users.ToListAsync();

            int uReturned = ReturnedOnXDay(_days);
            int uRegistrated = RegisteredXDaysAgo(_days);

            float rollingRetention = ((float)uReturned / (float)uRegistrated)*100;
            var resp = Math.Round(rollingRetention, 2);
            var response = "";

            if (resp >= 0 || resp <= 100)
            {
                string str = resp.ToString();
                if (str.Contains(','))
                {
                    str = str.Replace(',', '.');
                }
                response = str;
            }
            else
            {
                response = "При таких входных данных значение для 'Rolling Retention 7 day' не может быть рассчитано";
            }
            return response;
        }

        private int RegisteredXDaysAgo(int x)
        {
            int count = 0;

            foreach (var user in _usersRet)
            {
                int i = DateSubtract(user.Created, DateTime.Now);
                Console.WriteLine($"{i}>={x}");
                    if (i>= x)
                    {
                        count++;
                    }
            }
            return count;
        }

        private int ReturnedOnXDay(int x)
        {
            int count = 0;

            foreach (var user in _usersRet)
            {
                if (DateSubtract(user.Created, user.LastActivity) >= x)
                {
                    count++;
                }
            }
            return count;
        }

        private int DateSubtract(DateTime dateFrom, DateTime dateTo)
        {
            return dateTo.Subtract(dateFrom).Days;
        }


    }
}
