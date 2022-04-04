import {useEffect} from 'react'

import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY29kaW5nejJtIiwiYSI6ImNsMHQ2MTlqZjBocnUzanF1MzE1Z2ExODgifQ.GcopJAGTMaYggH56UnJYfQ';

const GoogleMap = ({pickupLocationCoordinates, destinationCoordinates}) => {
   
    useEffect(() => {
        const map = new mapboxgl.Map({
          container: "google-map-container",
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-99.29011, 39.39172 ],
          zoom: 3,
        });  

        if(pickupLocationCoordinates)  {
            addMarkerToMap(map, pickupLocationCoordinates);
        }
        if(destinationCoordinates)  {
          addMarkerToMap(map, destinationCoordinates);
      }

      if(pickupLocationCoordinates && destinationCoordinates) {
        map.fitBounds([
          pickupLocationCoordinates, 
          destinationCoordinates
        ], {
            padding: 70
        })
      }

  }, [pickupLocationCoordinates, destinationCoordinates]);

   const addMarkerToMap = (map, coordinates) => {
      const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map); 
   }



  return (
    <GoogleMapWrapper id="google-map-container" >
    </GoogleMapWrapper>
  )
}

export default GoogleMap;

const GoogleMapWrapper = tw.div`
    flex-1 min-w-full pt-96 mt-16
`;