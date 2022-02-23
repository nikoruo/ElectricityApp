using CsvHelper;
using System.Globalization;
using WebApi.Models;
using Newtonsoft.Json;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://localhost:3000",
                                                "http://localhost:3000"
                                              ).AllowAnyMethod().AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);

//var handler = new GetHandler();
app.MapGet("/", () => "Hello World!");
app.MapGet("/api/monthly", () => global::GetHandler.GetElectricitiesAsync("monthly"));

//for weekly data, this could be activated
//app.MapGet("/api/weekly", () => handler.GetElectricitiesAsync("weekly"));

app.Run();



//Handler for routers
class GetHandler
{
    static readonly HttpClient client = new();
    public static async Task<IEnumerable<ElectricityPeriod>> GetElectricitiesAsync(string period)
    {
        List<ElectricityPeriod> electricityMonthList = new();
        Dictionary<int, long> monthlyDatas = new(12);

        //the period is passed from frontend, so could start and end dates be if needed
        string start = "2019-01-01";
        string end = "2019-12-31";

        string hakaniemenKauppahalli = $"https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime={start}&EndTime={end}";

        HttpResponseMessage response = await client.GetAsync(hakaniemenKauppahalli);
        if (response.IsSuccessStatusCode)
        {
            string apiResponse = await response.Content.ReadAsStringAsync();

            List<ElectricityItem> electricityList = JsonConvert.DeserializeObject<List<ElectricityItem>>(apiResponse) ?? new List<ElectricityItem>();

            foreach (ElectricityItem electricityItem in electricityList)
            {
                //lets see if the data is requested in weekly or monthly period
                if (period == "monthly")
                {
                    if (monthlyDatas.ContainsKey(electricityItem.Timestamp.Month - 1))
                    {
                        monthlyDatas[electricityItem.Timestamp.Month - 1] = monthlyDatas[electricityItem.Timestamp.Month - 1] + electricityItem.Value;
                    }
                    else
                    {
                        monthlyDatas.Add(electricityItem.Timestamp.Month - 1, 0);
                    }
                }
            }

            //document path for the .csv file, currently in "csv" folder in the solution folder
            string docPath = @"..\csv\";

            System.IO.Directory.CreateDirectory(docPath);
            using (var writer = new StreamWriter(Path.Combine(docPath, $"Monthly_fetched_{DateTime.Now}.csv")))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteHeader<ElectricityItem>();
                csv.NextRecord();
                foreach (var electricity in electricityList)
                {
                    csv.WriteRecord(electricity);
                    csv.NextRecord();
                }
            }

            //in case of a monthly request, lets parse things into proper format
            foreach (int month in monthlyDatas.Keys)
            {
                ElectricityPeriod monthly = new();
                DateTime date = new(electricityList[0].Timestamp.Year, month + 1, electricityList[0].Timestamp.Day);

                monthly.Period = date.ToString("MMMM", new CultureInfo("en-GB"));
                monthly.ReportingGroup = electricityList[0].ReportingGroup;
                monthly.LocationName = electricityList[0].LocationName;
                monthly.Value = monthlyDatas[month];
                monthly.Unit = electricityList[0].Unit;

                electricityMonthList.Add(monthly);
            }
        }

        return electricityMonthList;
    }

}