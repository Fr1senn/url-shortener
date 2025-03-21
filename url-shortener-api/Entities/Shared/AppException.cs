namespace url_shortener_api.Entities.Shared
{
    public class AppException : Exception
    {
        public AppException(string message)
        : base(message)
        {
        }
    }
}
