using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABReact.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Created { get; set; }
        public string LastActivity { get; set; }
        
        [NotMapped] private int _lifeSpan;

        public int LifeSpan
        {
            get => _lifeSpan;
            set
            {
                value = DateTime.Parse(LastActivity).Subtract(DateTime.Parse(Created)).Days;
                _lifeSpan = value;
            }
        }
    }
}
