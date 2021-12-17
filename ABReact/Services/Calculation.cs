using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using ABReact.Data;
using ABReact.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ABReact.Services
{
    public class Calculation
    {
        private int _days = 1500;

        private List<User> _usersRet;
        public Calculation(List<User> users)
        {
            _usersRet = users;
        }
        public float RollingRetention()
        {
            int uReturned = ReturnedOnXDay(_days);
            int uRegistrated = RegisteredXDaysAgo(_days);

            float rollingRetentiom = ((float)uReturned / (float)uRegistrated)*100;

            return rollingRetentiom;
        }

        private int RegisteredXDaysAgo(int x)
        {
            int count = 0;

            foreach (var user in _usersRet)
            {
                    if(DateSubtract(DateTime.Parse(user.LastActivity), DateTime.Now)>=x)
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
                if (DateSubtract(DateTime.Parse(user.Created), DateTime.Parse(user.LastActivity)) >= x)
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
