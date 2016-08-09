using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListR.Models;
using Microsoft.AspNetCore.Mvc;

namespace ListR.Controllers
{
    [Route("api/[controller]")]
    public class ListsController : ListRController
    {
        public ListsController(IListRContext dbContext) : base(dbContext)
        {
            
        }
        // GET api/lists
        [HttpGet]
        public IActionResult GetAll()
        {
            return new ObjectResult(DbContext.Lists.ToList());
        }

        // GET api/lists/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new ObjectResult(DbContext.Lists.FirstOrDefault(x => x.Id == id));
        }

        // POST api/lists
        [HttpPost]
        [Route("/api/lists/")]
        public IActionResult Post([FromBody]List list)
        {
            DbContext.Lists.Add(list);
            DbContext.SaveChanges();
            return new ObjectResult(list);
        }

        // PUT api/lists/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]List list)
        {
            var updatedList = DbContext.Lists.FirstOrDefault(x => x.Id == list.Id);
            if (updatedList != null)
            {
                updatedList.ListName = list.ListName;
                DbContext.Lists.Update(updatedList);
                DbContext.SaveChanges();
            }
        }

        // DELETE api/lists/5
        [HttpDelete("{listId}")]
        public void Delete(int listId)
        {
            var list = DbContext.Lists.FirstOrDefault(x => x.Id == listId);
            if (list!=null)
            {
                DbContext.Remove(list);
                DbContext.SaveChanges();
            }
        }
    }


    public class ListRController : Controller
    {
        public readonly IListRContext DbContext;

        public ListRController(IListRContext dbContext)
        {
            DbContext = dbContext;
        }

        
    }
}
