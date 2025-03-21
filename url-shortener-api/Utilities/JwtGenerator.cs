using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using url_shortener_api.Entities.Shared;
using url_shortener_api.Utilities.Interfaces;

namespace url_shortener_api.Utilities
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expirationInMinutes;

        public JwtGenerator(IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");

            _secretKey = jwtSettings["SecretKey"] ?? throw new AppException("SecretKey is missing in configuration");
            _issuer = jwtSettings["Issuer"] ?? throw new AppException("Issuer is missing in configuration");
            _audience = jwtSettings["Audience"] ?? throw new AppException("Audience is missing in configuration");

            if (!int.TryParse(jwtSettings["ExpirationInMinutes"], out _expirationInMinutes))
            {
                throw new AppException("ExpirationInMinutes is missing or invalid in configuration");
            }
        }

        public string GenerateToken(int userId, string username, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("userId", userId.ToString()),
                new Claim("role", role),
            };

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_expirationInMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
