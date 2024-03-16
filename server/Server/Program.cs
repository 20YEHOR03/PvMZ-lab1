using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

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

app.MapPost("/convert", ([FromBody] string input) =>
{
    if (string.IsNullOrEmpty(input))
    {
        app.Logger.LogWarning("Input string is null or empty");
        return Results.BadRequest("Input string is null or empty");
    }

    string pattern = @"[0-9A-Fa-f]+";
    string result;
    try
    {
        result = Regex.Replace(input, pattern, match => $"\"{match.Value}\"");
    }
    catch (Exception ex)
    { 
        app.Logger.LogError($"An error occurred: {ex.Message}");
        return Results.BadRequest("An error occurred while processing the request");
    }
    return Results.Ok(result);
});


app.Run("http://localhost:5000");