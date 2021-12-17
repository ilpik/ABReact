using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ABReact.Models
{
    public class UserApi
    {
        public int UserId { get; set; }
        
        [Required]
        [DataType(DataType.Date)]
        public DateTime Created { get; set; }
        
        [Required]
        [DataType(DataType.Date)]
        public DateTime LastActivity { get; set; }

        public int LifeSpan { get; set; }
    }
}
