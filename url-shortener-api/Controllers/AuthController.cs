using Microsoft.AspNetCore.Mvc;
using url_shortener_api.Entities.Requests;
using url_shortener_api.Entities.Shared;
using url_shortener_api.Repositories.Interfaces;

namespace url_shortener_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPut]
        public async Task<ApiResponse> Register([FromBody] RegisterRequest request)
        {
            await _authRepository.RegisterAsync(request);
            return ApiResponse.Ok();
        }

        [HttpPost]
        public async Task<ApiResponse<string>> Login([FromBody] LoginRequest request)
        {
            string jwt = await _authRepository.LoginAsync(request);
            return ApiResponse<string>.Ok(jwt);
        }
    }
}
