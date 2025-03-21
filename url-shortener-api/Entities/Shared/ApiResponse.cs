namespace url_shortener_api.Entities.Shared
{
    public class ApiResponse
    {
        public bool Success { get; }
        public string? Message { get; }

        protected ApiResponse(bool success, string? message)
        {
            Success = success;
            Message = message;
        }

        public static ApiResponse Ok() => new ApiResponse(true, null);
        public static ApiResponse Error(string message) => new ApiResponse(false, message);
    }

    public class ApiResponse<T> : ApiResponse
    {
        public T? Data { get; }

        private ApiResponse(bool success, string? message, T? data) : base(success, message)
        {
            Data = data;
        }

        public new ApiResponse Error(string message) => new ApiResponse<T>(false, message, default);
        public static ApiResponse<T> Ok(T data) => new ApiResponse<T>(true, null, data);
    }
}
