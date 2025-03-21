using System.ComponentModel.DataAnnotations;

namespace url_shortener_api.Entities.Requests
{
    public class LoginRequest
    {
        [Required]
        public string Login { get; set; } = null!;
        [Required]
        [RegularExpression("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$")]
        public string Password { get; set; } = null!;
    }
}
