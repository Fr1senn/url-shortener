using Microsoft.EntityFrameworkCore;
using System;
using url_shortener_api.Repositories.Interfaces;
using url_shortener_api.Repositories;

namespace url_shortener_api.Extentions
{
    public static class RepositoryExtention
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAuthRepository, AuthRepository>();
        }
    }
}
