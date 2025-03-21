using url_shortener_api.Entities.Requests;

namespace url_shortener_api.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<string> LoginAsync(LoginRequest request);
        Task RegisterAsync(RegisterRequest request);
    }
}
