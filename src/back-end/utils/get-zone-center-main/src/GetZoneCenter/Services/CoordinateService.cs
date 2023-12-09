using GetZoneCenter.Models;

namespace GetZoneCenter.Services
{
    public static class CoordinateService
    {
        public static Coordinate CalculatePolygonCenter(List<Coordinate> corners)
        {
            double sumLat = 0.0;
            double sumLng = 0.0;

            foreach (var corner in corners)
            {
                sumLat += corner.Lat;
                sumLng += corner.Lng;
            }

            double centerLat = sumLat / corners.Count;
            double centerLng = sumLng / corners.Count;

            return new Coordinate(centerLat, centerLng);
        }
    }
}
