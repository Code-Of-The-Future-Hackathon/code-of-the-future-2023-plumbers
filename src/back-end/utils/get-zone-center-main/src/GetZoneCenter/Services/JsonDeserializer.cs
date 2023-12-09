using System.Text.Json;
using System.Text.Json.Serialization;

namespace GetZoneCenter.Services
{
    public static class JsonDeserializer
    {
        public static T ParseJSON<T>(string json)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters =
                        {
                            new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
                        }
            };

            return JsonSerializer.Deserialize<T>(json, options);
        }
    }
}
