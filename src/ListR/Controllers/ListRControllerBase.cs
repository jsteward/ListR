using ListR.Models;
using Microsoft.AspNetCore.Mvc;

namespace ListR.Controllers
{
    public class ListRControllerBase : Controller
    {
        protected readonly IListRContext DbContext;

        protected ListRControllerBase(IListRContext dbContext)
        {
            DbContext = dbContext;
        }

        
    }
}