using System.Text.RegularExpressions;
using Server;

string ip = "192.168.56.101";
string route = "http://" + ip + ":4832";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();

// Додайте дозвіл CORS у обробник запитів
app.UseCors(policy =>
{
    policy.AllowAnyOrigin();
    policy.AllowAnyMethod();
    policy.AllowAnyHeader();
});
app.Logger.LogInformation("The app started");

app.MapPost("/mark_hex", async (HttpContext context) =>
{
    // Отримуємо дані в форматі JSON
    var inputJson = await context.Request.ReadFromJsonAsync<InputModel>();

    if (inputJson == null || string.IsNullOrEmpty(inputJson.Input))
    {
        return Results.BadRequest("Input is missing or empty.");
    }
    
    string pattern = @"[0-9A-Fa-f]+";
    string result;
    try
    {
        result = Regex.Replace(inputJson.Input, pattern, match => $"\"{match.Value}\"");
    }
    catch (Exception ex)
    { 
        app.Logger.LogError($"An error occurred: {ex.Message}");
        return Results.BadRequest("An error occurred while processing the request");
    }
    return Results.Ok(result);
});

app.Run(route);