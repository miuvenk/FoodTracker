namespace foodtracker.Models
{
    public class RestaurantList
    {
        public long Id {get; set;}
        public string? Name {get; set;}
        public string? Type {get; set;}
        public string? Province {get; set;}
        public string? County {get; set;}
        public string? DateEstablishment {get; set;}
    }
}