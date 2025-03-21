namespace url_shortener_api.Entities.Models
{
    public class User : BaseModel
    {
        public string Login { get; set; } = null!;
        public string HashedPassword { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;
        public ICollection<Url> Urls { get; set; } = new List<Url>();
    }
}
