import { useEffect, useState } from "react";

function useGeolocation() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          try {
            if (city === null) {
              const reverseGeocodeResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await reverseGeocodeResponse.json();

              if (data.address) {
                const cityName =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  data.address.county;

                setCity(cityName);
              }
            }
          } catch (error) {
            console.error("Error fetching city:", error);
            setError("Error fetching city");
          }
        },
        (err) => {
          setError(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { currentLocation, city, error };
}

export default useGeolocation;
