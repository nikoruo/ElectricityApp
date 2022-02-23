using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;

namespace WebApi_tests
{
    public class WebApi_tests
    {

        //simple check for route "/" route
        [Fact]
        public async void LifeCheck()
        {
            var appFactory = new WebApplicationFactory<Program>();
            var TestClient = appFactory.CreateClient();
            var response = await TestClient.GetAsync("/");

            response.EnsureSuccessStatusCode();
            Assert.Equal("Hello World!", await response.Content.ReadAsStringAsync());
        }

        /*
        An attempt to create integration test for the /api/monthly route + handler
        Decided to leave it here, as at work, this would had been a moment at which I would
        had asked help from a mentor.
         
        clientOptions was created as without it the test actually sends the GET to http address, which wont work as backend runs at https
        but I doubt that this was the issue as adding it didnt fix the problem
         
        [Fact]
        public async void Get_EndpointsReturnSuccessAndCorrectContentType()
        {
            var appFactory = new WebApplicationFactory<Program>();
            var clientOptions = new WebApplicationFactoryClientOptions();
            clientOptions.BaseAddress = new System.Uri("https://localhost:5001");

            // Arrange
            var client = appFactory.CreateClient(clientOptions);

            // Act
            var response = await client.GetAsync("/api/monthly");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }*/
    }
}