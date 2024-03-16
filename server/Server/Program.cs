using System.Text.RegularExpressions;

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

app.MapGet("/convert", (string input) =>
{
    string pattern = @"[0-9A-Fa-f]+";
    string result = Regex.Replace(input, pattern, match => $"'{match.Value}'");
    return result;
});

app.Run("http://localhost:5000");