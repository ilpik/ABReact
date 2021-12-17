﻿using System;
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
        public DateTime Created { get; set; }
        public DateTime LastActivity { get; set; }

    }
}
