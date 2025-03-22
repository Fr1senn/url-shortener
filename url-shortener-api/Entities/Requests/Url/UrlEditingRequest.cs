using System.ComponentModel.DataAnnotations;

namespace url_shortener_api.Entities.Requests.Url
{
    public class UrlEditingRequest
    {
        public int Id { get; set; }
        [Required]
        public string Url { get; set; } = null!;
    }
}
