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
        public async Task<ActionResult> GetRollRet()
        {
            List<User> users = await _ctx.Users.ToListAsync();
            var value = await new Calculation(_ctx).RollingRetention();
            
            return Ok(value);

        }

    }
}
