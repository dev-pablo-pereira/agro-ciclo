import * as Location from "expo-location";
import { useState, useCallback } from "react";

export function useCurrentLocation() {
  const [locations, setLocations] = useState<Location.LocationObject[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocations((prev) => [...prev, loc]);
    } catch (error) {
      setErrorMsg("Não foi possível obter a localização");
    }
  }, []);

  return { locations, errorMsg, getCurrentLocation };
}
