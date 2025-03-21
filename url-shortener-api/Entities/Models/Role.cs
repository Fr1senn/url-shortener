namespace url_shortener_api.Entities.Models
{
    public class Role : BaseModel
    {
        public string Title { get; set; } = null!;
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
