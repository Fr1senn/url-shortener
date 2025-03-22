namespace url_shortener_api.Entities.Dtos
{
    public class UrlDto
    {
        public int Id { get; set; }
        public string OriginalUrl { get; set; } = null!;
        public string ShortUrl { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public UserDto CreatedBy { get; set; } = null!;
    }
}
