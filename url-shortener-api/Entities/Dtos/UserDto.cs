namespace url_shortener_api.Entities.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}
