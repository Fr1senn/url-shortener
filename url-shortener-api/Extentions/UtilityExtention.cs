using url_shortener_api.Repositories.Interfaces;
using url_shortener_api.Repositories;
using url_shortener_api.Utilities.Interfaces;
using url_shortener_api.Utilities;

namespace url_shortener_api.Extentions
{
    public static class UtilityExtention
    {
        public static void AddUtilities(this IServiceCollection services)
        {
            services.AddScoped<IJwtGenerator, JwtGenerator>();
        }
    }
}
