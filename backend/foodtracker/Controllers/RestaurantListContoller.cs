#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using foodtracker.Models;

namespace foodtracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class RestaurantListContoller : ControllerBase
    {
        private readonly RestaurantListContext _context;

        public RestaurantListContoller(RestaurantListContext context)
        {
            _context = context;
        }

        // GET: api/RestaurantListContoller
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RestaurantList>>> GetRestaurantLists()
        {
            return await _context.RestaurantLists.ToListAsync();
        }

        // GET: api/RestaurantListContoller/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RestaurantList>> GetRestaurantList(long id)
        {
            var restaurantList = await _context.RestaurantLists.FindAsync(id);

            if (restaurantList == null)
            {
                return NotFound();
            }

            return restaurantList;
        }

        // PUT: api/RestaurantListContoller/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRestaurantList(long id, RestaurantList restaurantList)
        {
            if (id != restaurantList.Id)
            {
                return BadRequest();
            }

            _context.Entry(restaurantList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RestaurantListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RestaurantListContoller
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RestaurantList>> PostRestaurantList(RestaurantList restaurantList)
        {
            _context.RestaurantLists.Add(restaurantList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRestaurantList", new { id = restaurantList.Id }, restaurantList);
        }

        // DELETE: api/RestaurantListContoller/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurantList(long id)
        {
            var restaurantList = await _context.RestaurantLists.FindAsync(id);
            if (restaurantList == null)
            {
                return NotFound();
            }

            _context.RestaurantLists.Remove(restaurantList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RestaurantListExists(long id)
        {
            return _context.RestaurantLists.Any(e => e.Id == id);
        }
    }
}
