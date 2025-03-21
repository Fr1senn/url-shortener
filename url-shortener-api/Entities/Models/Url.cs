namespace url_shortener_api.Entities.Models
{
    public class Url : BaseModel
    {
        public string OriginalUrl { get; set; } = null!;
        public string ShortUrl { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CreatedById { get; set; }
        public User CreatedBy { get; set; } = null!;
    }
}
