import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// Google maps API component
const MapComponent = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  }

  const center = {
    lat: -37.751674240414914,
    lng: 145.23438674601857,
  }

  const apiKey = import.meta.env.VITE_API_TOKEN

  // Function to handle marker click
  const handleMarkerClick = () => {
    // Open the link in a new tab when the red marker is clicked
    window.open('https://www.google.com/maps/place/Bramleigh+Estate/@-37.7525352,145.2293871,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad630c9000b56bb:0xa7c8a9182b6e24e3!8m2!3d-37.7525395!4d145.234258!16s%2Fg%2F11hcy_z2v1?entry=ttu', '_blank')
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={11}>
        <Marker position={center} onClick={handleMarkerClick} />
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent
