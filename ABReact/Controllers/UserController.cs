using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ABReact.Data;
using ABReact.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ABReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _ctx;

        public UserController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet("id")]
        public async Task<ActionResult<User>> GetUser(int id)
        {

            var user = await _ctx.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserApi>>> GetUsers()
        {
            if (_ctx.Users.Any())
            {
                List<User> users = await _ctx.Users.ToListAsync();
                List<UserApi> usersApi = new List<UserApi>();

                foreach (var user in users)
                {
                    usersApi.Add(new UserApi
                    {
                        UserId = user.UserId,
                        Created = user.Created,
                        LastActivity = user.LastActivity,
                        LifeSpan = user.LastActivity.Subtract(user.Created).Days
                    });
                }

                return usersApi;
            }
            else
            {
                return NotFound();
            }

        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> PostUser(List<UserApi> users)
        {
            foreach (var user in users)
            {
                if (user.Created.CompareTo(user.LastActivity) != 1)
                {
                    if (user.UserId != 0)
                    {
                        _ctx.Add(user);
                    }
                    else
                    {
                        UpdateUser(user);
                    }
                }
                else return BadRequest();
            }

            return await _ctx.Users.ToListAsync();
        }

        [HttpPut]
        public void UpdateUser(UserApi user)
        {
            _ctx.Update(user);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveUser(int id)
        {
            var user = await _ctx.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _ctx.Users.Remove(user);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }

        public async Task<bool> SaveChangesAsync()
        {
            if (await _ctx.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }
}