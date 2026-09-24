using System.ComponentModel.DataAnnotations;

namespace ApiAutos.Models
{
    public class Auto 
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "La marca es obligatorio")]
        public string? Marca { get; set; } 

        [Required(ErrorMessage = "El modelo es obligatorio")]
        [MinLength(2, ErrorMessage = "El modelo debe tener al menos 2 caracteres")]
        public string? Modelo { get; set; }

        [Required(ErrorMessage = "El anio es obligatorio")]
        public int? Anio { get; set; } 
        
        [Required(ErrorMessage = "La patente es obligatorio")]
        public string? Patente { get; set; } 

        [Required(ErrorMessage = "Los km son obligatorios")]
        [Range(0, int.MaxValue, ErrorMessage = "Los km no pueden ser negativos")]
        public int? Km { get; set; } 

        [Required(ErrorMessage = "La fecha de ingreso es obligatoria")]
        public DateTime? FechaIngreso { get; set; }

        [Required(ErrorMessage = "Debe indicar si el auto esta disponible")]
        public bool? Disponible { get; set;}
    }
}