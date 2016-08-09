using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListR.Models
{
    public class List
    {
        public int Id { get; set; }
        public string ListName { get; set; }
        public List<Item> Items { get; set; }
    }
}
