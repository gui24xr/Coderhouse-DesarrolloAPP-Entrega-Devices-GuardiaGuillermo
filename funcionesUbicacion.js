import * as Location from "expo-location";

const MyApiKey = "AIzaSyAyGFYwbMHbZdxWApNKnJYaDqOLZ-3XxzQ";


const getUbicacion = async () => {
  //Verifico Permisos
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    //setErrorMsg('Permission to access location was denied');
    return 0;
  }

  //Obtengo la ubicacion, esta funcion me la devuelve en forma de objeto con los datos.
  let location = await Location.getCurrentPositionAsync({});

  //Devuelvo un objeto coords.
 //console.log(location.coords)
  //console.log(location.coords.latitude)
  //console.log(location.coords.longitude)
  //Devuelve cero si hay error, si no devuelve las coord.
  return location.coords;
};

//Devuelve la url con la api del mapa listo y los parametros pasados
const getMapaImage = (apiKey, latitud, longitud) => {
  return (
    "https://maps.googleapis.com/maps/api/staticmap?center=" +
    latitud + ',' + longitud +
    "&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7C" +
    latitud + ',' + longitud +
    "&key=" +
    apiKey
  );
};



/*
const getMapaImage2 = (apiKey, latitud, longitud) => {
  return (
    "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=" +
    MyApiKey
  );
};
*/
export { getUbicacion, getMapaImage, MyApiKey };


