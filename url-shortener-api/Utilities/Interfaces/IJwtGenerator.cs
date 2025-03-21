using url_shortener_api.Entities.Enums;

namespace url_shortener_api.Utilities.Interfaces
{
    public interface IJwtGenerator
    {
        string GenerateToken(int userId, string username, string role);
    }
}
