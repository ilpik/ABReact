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
            return _ctx.Users.FirstOrDefault(x => x.Id == id);
        }   

        [HttpGet]
        public List<User> GetUsers()
        {
            return _ctx.Users.ToList();
        }
        [HttpPost]
        public void PostUser(User user)
        {
            _ctx.Add(user);
        }
        [HttpPut]
        public void UpdateUser(User user)
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
