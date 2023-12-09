using Google.Cloud.Functions.Framework;

using Microsoft.AspNetCore.Http;

using System.Net;
using GetZoneCenter.Services;
using GetZoneCenter.Models;
using System.Text.Json;

namespace GetZoneCenter
{
    /// <summary>
    /// The unit of distance used in this project is meters.
    /// </summary>
    class Program : IHttpFunction
    {
        public async Task HandleAsync(HttpContext context)
        {
            AddCors(context);

            try
            {
                HttpRequest request = context.Request;

                if (request.Method == HttpMethod.Options.Method)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.OK;
                    return;
                }

                if (request.Method != HttpMethod.Post.Method)
                {
                    throw new ArgumentException("Only post requests accepted!");
                }

                var input = await HttpRequestService
                  .ParseRequestBodyAsync<ProgramInput>(request);

                var result = CoordinateService.CalculatePolygonCenter(input.ZonePoints);

                context.Response.StatusCode = (int)HttpStatusCode.OK;
                await context.Response.WriteAsync(JsonSerializer.Serialize(result));
            }
            catch (Exception e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync(e.Message);
            }
        }

        private static void AddCors(HttpContext context)
        {
            context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
            context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            context.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type, Authorization");
            context.Response.Headers.Append("Access-Control-Max-Age", "3600");
        }
    }
}