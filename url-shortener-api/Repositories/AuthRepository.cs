using Microsoft.EntityFrameworkCore;
using url_shortener_api.Entities.Models;
using url_shortener_api.Entities.Requests;
using url_shortener_api.Entities.Shared;
using url_shortener_api.Repositories.Interfaces;
using url_shortener_api.Utilities;
using url_shortener_api.Utilities.Interfaces;

namespace url_shortener_api.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UrlShortenerDbContext _context;
        private readonly IJwtGenerator _jwtGenerator;

        public AuthRepository(UrlShortenerDbContext context, IJwtGenerator jwtGenerator)
        {
            _context = context;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<string> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Login == request.Login);

            if (user is null)
            {
                throw new AppException("User doesn't exist");
            }

            if (!PasswordUtility.ArePasswordsMatching(user.HashedPassword, request.Password))
            {
                throw new AppException("Invalid password");
            }

            return _jwtGenerator.GenerateToken(user.Id, user.Login, user.Role.Title);
        }

        public async Task RegisterAsync(RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Login == request.Login))
            {
                throw new AppException("A user with this login already exists");
            }

            var user = new User
            {
                Login = request.Login,
                HashedPassword = PasswordUtility.HashPassword(request.Password),
                RoleId = (int)Entities.Enums.Role.User
            };

            _context.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
