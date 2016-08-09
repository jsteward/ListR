using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ListR.Models
{
    public interface IListRContext
    {
        DbSet<Item> Items { get; set; }
        DbSet<List> Lists { get; set; }
        void SaveChanges();
        void Remove<T>(T entity) where T : class;
    }

    public class ListRContext : DbContext, IListRContext
    {
        private static bool _created = false;

        public ListRContext(DbContextOptions<ListRContext> options) : base(options)
        {
            if (!_created)
            {
                _created = true;
                Database.EnsureCreated();
            }
        }

        public DbSet<Item> Items { get; set; }

        public DbSet<List> Lists { get; set; }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new void Remove<T>(T entity) where T : class
        {
            base.Remove(entity);
        }

    }
}
