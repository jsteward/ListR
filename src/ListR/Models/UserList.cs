using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListR.Models
{
    public class UserList
    {
        public User User { get; set; }
        public int UserId { get; set; }
        public List List { get; set; }
        public int ListId { get; set; }
    }
}
