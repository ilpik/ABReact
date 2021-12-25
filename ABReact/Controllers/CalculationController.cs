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
        private readonly AppDbContext _ctx;
        public CalculationController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<ActionResult<double>> GetRollRet()
        {
            List<User> users = await _ctx.Users.ToListAsync();
            var value = await new Calculation(_ctx).RollingRetention();
            var response="";
            if (value >= 0 || value <= 100)
            {
                response = value.ToString();
            }
            else
            {
            response= "При таких входных данных значение для 'Rolling Retention 7 day' не может быть рассчитано";
            }
            return Ok(response);

        }

    }
}
