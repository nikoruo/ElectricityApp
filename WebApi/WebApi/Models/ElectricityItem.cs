namespace WebApi.Models
{
    //base class for electricity items
    public class ElectricityItem
    {
        public DateTime Timestamp { get; set; }
        public string? ReportingGroup { get; set; }
        public string? LocationName { get; set; }
        public long Value { get; set; }
        public string? Unit { get; set; }
    }

    //extended class, so we can specify the period
    public class ElectricityPeriod : ElectricityItem
    {
        public string? Period { get; set; }
    }
}
