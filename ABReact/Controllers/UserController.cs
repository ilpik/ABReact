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

        [HttpGet]
        public async Task<ActionResult<List<UserApi>>> GetUsers()
        {
            List<User> users = _ctx.Users.ToList();
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
        
        [HttpPost]
        public void PostUser(List<UserApi> users)
        {
            foreach (var user in users)
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

            return await _ctx.Users.ToListAsync();
        }

        [HttpPut]
        public async Task UpdateUser(User user)
        {
            _ctx.Update(user);
            await SaveChangesAsync();
        }

        [HttpDelete]
        public void RemoveUser(int id)
        {
            _ctx.Users.Remove(GetUser(id));
        }

        public Task<bool> SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}