using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ListR.Controllers
{
    [Route("api/[controller]")]
    public class ListsController : ListRControllerBase
    {
        public ListsController(IListRContext dbContext) : base(dbContext)
        {
            
        }
        // GET api/lists
        [HttpGet]
        public IActionResult GetAll(int userId)
        {
            var usersLists = DbContext.UserList.Where(userList => userList.UserId == userId).Select(list => list.List);

            return new ObjectResult(usersLists);
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
            list.ListOwnerId = 1;
            DbContext.Lists.Add(list);
            DbContext.SaveChanges();
            DbContext.UserList.Add(new UserList {ListId = list.Id, UserId = 1});
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
            var list = DbContext.Lists.Include(x=>x.Items).FirstOrDefault(x => x.Id == listId);
            if (list!=null)
            {
                foreach (var item in list.Items)
                {
                    DbContext.Remove(item);
                }
                DbContext.Remove(list);
                DbContext.SaveChanges();
            }
        }
    }
}
