using Microsoft.EntityFrameworkCore;
using url_shortener_api.Entities.Dtos;
using url_shortener_api.Entities.Models;
using url_shortener_api.Entities.Requests.Url;
using url_shortener_api.Entities.Shared;
using url_shortener_api.Extentions;
using url_shortener_api.Repositories.Interfaces;

namespace url_shortener_api.Repositories
{
    public class UrlRepository : IUrlRepository
    {
        private readonly UrlShortenerDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private int? UserId => _httpContextAccessor.HttpContext?.GetUserId();


        public UrlRepository(UrlShortenerDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task CreateAsync(UrlCreationRequest request)
        {
            var existingUrl = await _context.Urls.FirstOrDefaultAsync(u => u.OriginalUrl == request.Url && u.CreatedById == UserId);

            if (existingUrl != null)
            {
                throw new AppException("You're trying to create an existing URL");
            }

            _context.Add(new Url
            {
                OriginalUrl = request.Url,
                ShortUrl = $"{UserId}-{Guid.NewGuid()}",
                CreatedById = UserId ?? throw new AppException("User isn't authenticated."),
                CreatedAt = DateTime.UtcNow,
            });
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int urlId)
        {
            var url = await _context.Urls
                .Include(u => u.CreatedBy)
                .SingleOrDefaultAsync(u => u.Id == urlId);

            if (url is null)
            {
                throw new AppException("Url doesn't exist");
            }

            bool isAdmin = _httpContextAccessor.HttpContext?.User.IsInRole("Admin") ?? false;

            if (url.CreatedById != UserId && !isAdmin)
            {
                throw new AppException("You don't have permission to delete this URL.");
            }

            _context.Remove(url);
            await _context.SaveChangesAsync();
        }


        public async Task EditAsync(UrlEditingRequest request)
        {
            var url = await _context.Urls.SingleOrDefaultAsync(u => u.Id == request.Id);

            if (url is null)
            {
                throw new AppException("URL doesn't exist");
            }

            var user = await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Id == UserId);

            if (user is null)
            {
                throw new AppException("User isn't authenticated.");
            }

            if (user.Role.Title != "Admin")
            {
                throw new AppException("You don't have permission to edit this URL.");
            }

            var existingUrl = await _context.Urls.FirstOrDefaultAsync(u => u.OriginalUrl == request.Url);

            if (existingUrl != null)
            {
                throw new AppException("This URL already exists.");
            }

            url.OriginalUrl = request.Url;
            await _context.SaveChangesAsync();
        }


        public async Task<List<UrlDto>> GetAllAsync()
        {
            var urls = await _context.Urls
                .AsNoTracking()
                .Include(u => u.CreatedBy)
                    .ThenInclude(cb => cb.Role)
                .OrderByDescending(u => u.CreatedAt)
                .Select(u => new UrlDto
                {
                    OriginalUrl = u.OriginalUrl,
                    ShortUrl = u.ShortUrl,
                    CreatedAt = u.CreatedAt,
                    CreatedBy = new UserDto
                    {
                        Login = u.CreatedBy.Login,
                        Role = u.CreatedBy.Role.Title
                    }
                }).ToListAsync();
            return urls;
        }

        public async Task<UrlDto> GetByShortUrlAsync(string shortUrl)
        {
            var url = await _context.Urls
                .AsNoTracking()
                .Include(u => u.CreatedBy)
                    .ThenInclude(cb => cb.Role)
                .SingleOrDefaultAsync(u => u.ShortUrl == shortUrl);

            if (url is null)
            {
                throw new AppException("Url doesn't exist");
            }

            bool isAdmin = _httpContextAccessor.HttpContext?.User.IsInRole("Admin") ?? false;

            if (url.CreatedById != UserId && !isAdmin)
            {
                throw new AppException("You don't have permission to delete this URL.");
            }

            return new UrlDto
            {
                Id = url.Id,
                OriginalUrl = url.OriginalUrl,
                ShortUrl = url.ShortUrl,
                CreatedAt = url.CreatedAt,
                CreatedBy = new UserDto
                {
                    Id = url.CreatedBy.Id,
                    Login = url.CreatedBy.Login,
                    Role = url.CreatedBy.Role.Title
                }
            };
        }
    }
}
