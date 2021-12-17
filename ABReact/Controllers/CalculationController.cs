using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ABReact.Data;
using ABReact.Models;
using ABReact.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ABReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculationController : ControllerBase
    {
        private readonly IEnumerable<User> _users;
        public CalculationController(AppDbContext ctx)
        {
            _users = ctx.Users.ToList();
        }

        [HttpGet]
        public float GetRollRet()
        {
            return new Calculation(_users).RollingRetention();
        }

    }
}
