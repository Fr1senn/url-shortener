using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace url_shortener_api.Utilities
{
    public static class PasswordUtility
    {
        public static string HashPassword(string password)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: Array.Empty<byte>(),
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 10000,
            numBytesRequested: 32));
        }

        public static bool ArePasswordsMatching(string hashedPassword, string inputPassword)
        {
            return hashedPassword == HashPassword(inputPassword);
        }
    }
}
