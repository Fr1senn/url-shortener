namespace url_shortener_api.Extentions
{
    using Microsoft.AspNetCore.Http;
    using System.Security.Claims;
    using url_shortener_api.Entities.Shared;

    public static class HttpContextExtension
    {
        public static int? GetUserId(this HttpContext httpContext)
        {
            if (httpContext?.User == null)
            {
                throw new AppException("HTTP context or User is null");
            }

            var userIdClaim = httpContext.User.FindFirst("userId")?.Value;

            return int.TryParse(userIdClaim, out var result) ? result : null;
        }
    }
}
