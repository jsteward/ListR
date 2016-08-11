using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListR.Models;

namespace ListR.Controllers
{
    public class UserController : ListRControllerBase
    {
        public UserController(IListRContext dbContext) : base(dbContext)
        {
        }


    }
}
