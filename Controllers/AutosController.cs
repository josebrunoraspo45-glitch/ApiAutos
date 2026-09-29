using ApiAutos.Data;
using ApiAutos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiAutos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AutosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auto>>> GetAutos()
        {
            return await _context.Autos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Auto>> GetAuto(int id)
        {
            var auto = await _context.Autos.FindAsync(id);

            if (auto == null)
            {
                return NotFound();
            }

            return auto;
        }

        [HttpPost]
        public async Task<ActionResult<Auto>> PostAuto(Auto auto)
        {
            _context.Autos.Add(auto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuto), new { id = auto.Id }, auto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuto(int id, Auto auto)
        {
            if (id != auto.Id)
            {
                return BadRequest("El ID no coincide con el del auto.");
            }

            var autoExistente = await _context.Autos.FindAsync(id);
            if (autoExistente == null)
            {
                return NotFound();
            }

            autoExistente.Marca = auto.Marca;
            autoExistente.Modelo = auto.Modelo;
            autoExistente.Anio = auto.Anio;
            autoExistente.Patente = auto.Patente;
            autoExistente.Km = auto.Km;
            autoExistente.FechaIngreso = auto.FechaIngreso;
            autoExistente.Disponible = auto.Disponible;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuto(int id)
        {
            var auto = await _context.Autos.FindAsync(id);
            if (auto == null)
            {
                return NotFound();
            }

            if (auto.Disponible == true)
            {
                return BadRequest("El vehiculo esta disponible y no puede ser eliminado.");
            }

            _context.Autos.Remove(auto);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}

