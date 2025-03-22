using System.ComponentModel.DataAnnotations;

namespace url_shortener_api.Entities.Requests.Url
{
    public class UrlCreationRequest
    {
        [Required]
        public string Url { get; set; } = null!;
    }
}
