using Microsoft.AspNetCore.Http;

namespace GetZoneCenter.Services
{
    public static class HttpRequestService
    {
        public static async Task<T> ParseRequestBodyAsync<T>(HttpRequest request)
        {
            using TextReader reader = new StreamReader(request.Body);
            {
                string json = await reader.ReadToEndAsync();

                return JsonDeserializer.ParseJSON<T>(json);
            }
        }
    }
}