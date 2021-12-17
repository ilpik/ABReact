using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ABReact.Data;
using ABReact.Models;
using Microsoft.AspNetCore.Mvc;


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
        public User GetUser(int id)
        {
            return _ctx.Users.FirstOrDefault(x => x.UserId == id);
        }   

        [HttpGet]
        public List<UserApi> GetUsers()
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
        }
        
        [HttpPut]
        public void UpdateUser(UserApi user)
        {
            _ctx.Update(user);
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
