using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ListR.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Notes { get; set; }
        public bool Complete { get; set; }
    }
}
