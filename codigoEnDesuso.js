<ScrollView style={styles.scrollContainer}>
        
<Pressable >
  <Image source={{ uri: imageURI }} style={styles.roundImage} />
  <Entypo name="camera" size={60} color="black" onPress={() => tomarFoto()} />
  <Entypo name="camera" size={60} color="black" onPress={() => ingresarDatosTomados()} />
</Pressable>

<Pressable style={styles.locationArea} onPress={() => tomarUbicacion()}>

  <Text>
  <FontAwesome5 name="map-marker-alt" size={24} color="black" />
  Mostrar Ubicacion
  
  </Text>
  
  <Text>{location.latitud}</Text>
  <Text>{location.longitud}</Text>
  <Image source={{ uri: mapPic }} style={styles.mapImage} />

</Pressable>






const tomarUbicacion = async () => {
    const ubicacionActual = await getUbicacion() //Es un objeto coords
    //Cpn las coordenadas que me dio el objeto armo el objeto que voy a setear en location.
    ubicacionActual != 0 ?
    setLocation({latitud:ubicacionActual.latitude,longitud:ubicacionActual.longitude})
    : ubicacionActual = location

    //Cpn las coordenadas que me dio el objeto armo el url del pic map
    const picMap = getMapaImage(MyApiKey,(ubicacionActual.latitude).toString(),ubicacionActual.longitude.toString())
    
    //Seteo pic map para mostrarlo.
    setMapPic(picMap)
    
  }
  

  //Funcion para tomar foto
  const tomarFoto = async () => {
    const fotoTomada =
      await pickImage(); /*Toma una foto y de ser exitoso la coloca en la imarrgen, de lo contrario deja la actual.*/
      
        fotoTomada != 0 
      ? setImageURI(fotoTomada) 
      : (fotoTomada = imageURI); //console.log("\nFFFFF: ", fotoTomada)

  };
