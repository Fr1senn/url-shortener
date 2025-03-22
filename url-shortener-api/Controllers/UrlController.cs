using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using url_shortener_api.Entities.Dtos;
using url_shortener_api.Entities.Filters;
using url_shortener_api.Entities.Filters.SharedFilters;
using url_shortener_api.Entities.Requests.Url;
using url_shortener_api.Entities.Shared;
using url_shortener_api.Repositories.Interfaces;

namespace url_shortener_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly IUrlRepository _urlRepository;

        public UrlController(IUrlRepository urlRepository)
        {
            _urlRepository = urlRepository;
        }

        [HttpPut]
        [Authorize]
        public async Task<ApiResponse> Create([FromBody] UrlCreationRequest request)
        {
            await _urlRepository.CreateAsync(request);
            return ApiResponse.Ok();
        }

        [HttpGet("all")]
        public async Task<ApiResponse<List<UrlDto>>> GetAll()
        {
            var urls = await _urlRepository.GetAllAsync();
            return ApiResponse<List<UrlDto>>.Ok(urls);
        }

        [HttpDelete]
        [Authorize]
        public async Task<ApiResponse> Delete([FromQuery] int urlId)
        {
            await _urlRepository.DeleteAsync(urlId);
            return ApiResponse.Ok();
        }

        [HttpPatch]
        [Authorize]
        public async Task<ApiResponse> Edit([FromBody] UrlEditingRequest request)
        {
            await _urlRepository.EditAsync(request);
            return ApiResponse.Ok();
        }

        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<UrlDto>> GetByShortUrl([FromQuery] string shortUrl)
        {
            var url = await _urlRepository.GetByShortUrlAsync(shortUrl);
            return ApiResponse<UrlDto>.Ok(url);
        }
    }
}
