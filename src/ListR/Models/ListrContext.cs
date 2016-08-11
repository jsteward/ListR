using Microsoft.EntityFrameworkCore;

namespace ListR.Models
{
    public interface IListRContext
    {
        DbSet<Item> Items { get; set; }
        DbSet<List> Lists { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<UserList> UserList { get; set; }
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

        public DbSet<User> Users { get; set; }

        public DbSet<UserList> UserList { get; set; }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new void Remove<T>(T entity) where T : class
        {
            base.Remove(entity);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserList>().HasKey(x => new { x.ListId, x.UserId });
            base.OnModelCreating(modelBuilder);
        }
    }
}
