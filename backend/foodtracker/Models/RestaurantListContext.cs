using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace foodtracker.Models
{
    public class RestaurantListContext : DbContext
    {
        public RestaurantListContext(DbContextOptions<RestaurantListContext> options)
            :base(options)
        {      
        }
        
        public DbSet<RestaurantList> RestaurantLists { get; set;} = null!;
    }
}