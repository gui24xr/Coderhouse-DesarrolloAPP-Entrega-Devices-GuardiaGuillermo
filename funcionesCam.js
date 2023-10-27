import * as ImagePicker from "expo-image-picker";

//PERMISOS PARA ACCEDER A LA CAM DEL DISPOSTIVO
const verificarPermisoCam = async () => {
  /*granted es el permiso de la camara, esta funcion verificva los permisos de la
    camara y de acuerdo a eso da false o true */
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();

  if (!granted) {
    return false;
  }
  return true;
};

//FUNCION PARA TOMAR FOTO. TOMA UNA FOTO CON LA CAM DEL DISPOSITIVO. SI SALE TODO BIEN DEVUELVE EL URI, SI NO DEVUELVE CERO.
const pickImage = async () => {
  //Espera el permiso de la cam
  const camaraAutorizada = await verificarPermisoCam();
  // SI tiene los permisos procedemos a tomar la foto
  if (camaraAutorizada) {
    //Lanzo la cam del dispositivo
    let resultCam = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [3, 4],
      base64: true,
      quality: 0.4,
    });
    //console.log('Resultado CAM: ', resultCam)
    /*Si no se cancelo la camarar, o sea si la foto realmente fue tomada: */
    if (!resultCam.canceled) {
      //Deconstrocturo el objeto resultCAM
      //const { uri, assets } = resultCam
      //let unaCadena64 = 'data:image/jpeg;base64,${resultCam.assets[0].base64}'
      return resultCam.assets[0].uri; //Un objeto estoy devolviendo.
    } //Si fue cancelada devuelvo un cero.
    else return 0;
  }
};

export { verificarPermisoCam, pickImage };
