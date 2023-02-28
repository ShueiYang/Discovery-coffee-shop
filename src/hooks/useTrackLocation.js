import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store-context";

function useTrackLocation() {

    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [findingLocation, setFindingLocation] = useState(false);

    const { dispatch } = useContext(StoreContext);

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        // store LatLong in StoreContext
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: {latLong: `${latitude},${longitude}`}
        })
        setLocationErrorMsg("");
        setFindingLocation(false);
    }
    const error = ()=> {
        setFindingLocation(false);
        setLocationErrorMsg("Unable to retrieve your location");
    }

    const handleTrackLocation = () => {
        setFindingLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser")
            setFindingLocation(false);
            
        } else {
            // Geolocation API
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    return {
        handleTrackLocation,
        locationErrorMsg,
        findingLocation
    };
}

export default useTrackLocation;