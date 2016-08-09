using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ListR.Models;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ListR.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : ListRController
    {
        public ItemsController(IListRContext dbContext) : base(dbContext)
        {

        }

        // GET api/items
        [HttpGet]
        [Route("/api/lists/{listId}/items")]
        public IActionResult GetAll(int listId)
        {
            var items = DbContext.Items.Where(x => x.ListId == listId).OrderByDescending(x => x.Id);
            return new ObjectResult(items);
        }

        // GET api/items/5
        [Route("/api/lists/{listId}/items/{itemId}")]
        public IActionResult Get(int id)
        {
            return new ObjectResult(DbContext.Items.FirstOrDefault(x => x.Id == id));
        }

        // POST api/items
        [HttpPost]
        [Route("/api/lists/{listId}/items")]
        public IActionResult Post([FromBody]Item item)
        {
            DbContext.Items.Add(item);
            DbContext.SaveChanges();
            return new ObjectResult(item);
        }

        // PUT api/items/5
        [HttpPut]
        [Route("/api/lists/{listId}/items")]
        public void Put(int listId, [FromBody]Item item)
        {
            var updatedItem = DbContext.Items.FirstOrDefault(x => x.Id == item.Id);
            if (updatedItem != null)
            {
                updatedItem.Complete = item.Complete;
                updatedItem.Name = item.Name;
                updatedItem.Notes = item.Notes;
                updatedItem.Quantity = item.Quantity;
                DbContext.Items.Update(updatedItem);
                DbContext.SaveChanges();
            }
        }

        // DELETE api/items/5
        [HttpDelete]
        [Route("/api/lists/items/{itemId}")]
        public void Delete(int itemId)
        {
            var item = DbContext.Items.FirstOrDefault(x => x.Id == itemId);

            if (item != null) DbContext.Remove((object)item);
            DbContext.SaveChanges();
        }
    }
}
