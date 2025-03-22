using url_shortener_api.Entities.Dtos;
using url_shortener_api.Entities.Requests.Url;

namespace url_shortener_api.Repositories.Interfaces
{
    public interface IUrlRepository
    {
        Task<List<UrlDto>> GetAllAsync();
        Task<UrlDto> GetByShortUrlAsync(string shortUrl);
        Task DeleteAsync(int urlId);
        Task CreateAsync(UrlCreationRequest request);
        Task EditAsync(UrlEditingRequest request);
    }
}
