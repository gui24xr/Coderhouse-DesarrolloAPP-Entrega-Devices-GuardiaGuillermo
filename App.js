import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { pickImage } from "./funcionesCam";
import { getUbicacion, getMapaImage, MyApiKey } from "./funcionesUbicacion";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import * as SQLite from "expo-sqlite";
import { initDB, insertRegisterDB, selectDB } from "./dataBase";

//INICIO UNA BASE DE DATOS
const db = SQLite.openDatabase("miDataBase154");
let estadoInicialArrayFlatList = [];

initDB(db)
  .then(() => {
    console.log("DB inicializada OK!!!");
  })
  .catch((err) => console.log("DB Fallo de Inicializacion . ", err.message));

export default function App() {
  //Estados
  const [arrayFlatList, setArrayFlatList] = useState(
    estadoInicialArrayFlatList
  );
  //Cargo los registros de la BD al array del flatList en el primer render
  useEffect(() => {
    selectDB(db)
      .then((result) => {
        //console.log('WWWW: ',result.rows._array)
        setArrayFlatList(result.rows._array.reverse()); //Reverse para que la ultima foto aparezca primerp
      })
      .catch((err) => console.log(err.message));
  }, []);

  const ingresarDatosTomados = async () => {
    //Una vez sacada la foto obtiene la ubicacion y guarda ambos en una tabla de sql para actualizar asi el array del flat
    const fotoTomada =
      await pickImage(); /*Toma una foto y de ser exitoso la coloca en la imarrgen, de lo contrario deja la actual.*/

    if (fotoTomada != 0) {
      //Si se tomo correctamente la foto busco la ubicacion actual del mapa y obtengo el pic map
      const ubicacionActual = await getUbicacion(); //Es un objeto coords
      //Con el objeto coords construyo la url de la imagen del mapa para guardarme y mas tarde rendereriza
      const picMap = getMapaImage(
        MyApiKey,
        ubicacionActual.latitude.toString(),
        ubicacionActual.longitude.toString()
      );

      //ya tengo las uri de foto y la ubicacion, las puedo ingresar a la BD y actualizar el array de la flatList

      insertRegisterDB(db, fotoTomada, picMap)
        .then((result) => {
          //console.log(result)
          alert("Foto ingreso a BD!!");
          //Ahora vuelvo a setear el array
          selectDB(db)
            .then((result) => {
              //console.log('WWWW: ',result.rows._array)
              setArrayFlatList(result.rows._array.reverse()); //Reverse para que la ultima foto aparezca primerp
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => {
          alert("Error, volve a intentarlo !!");
          console.log(err.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        placement="top"
        centerComponent={{
          text: "CAM-LOCATE-SQL",
          style: { color: "#fff", alignSelf: "center", fontSize: 20 },
        }}
        containerStyle={{
          backgroundColor: "#007aff",
          height: 100,
          justifyContent: "center",
        }}
      />

      <Pressable
        style={styles.botonContainer}
        onPress={() => ingresarDatosTomados()}
      >
        <MaterialCommunityIcons
          name="camera-enhance-outline"
          size={80}
          color="black"
        />
        <Text>TOMA FOTOS Y OBTENE TU UBICACION !</Text>
      </Pressable>
      <Pressable style={styles.iconosContainer}>
        <Entypo name="camera" size={60} color="white" />
        <Feather name="map-pin" size={60} color="white" />
      </Pressable>

      <FlatList
        style={styles.flatListContainer}
        data={arrayFlatList}
        keyExtractor={(item) => item.id}
        numColurmns={2}
        renderItem={({ item }) => (
          <>
            <Image source={{ uri: item.path_pic }} style={styles.gridImage} />
            <></>
            <Image source={{ uri: item.path_map }} style={styles.gridImage} />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },

  iconosContainer: {
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "fit-content",
    paddingVertical: 10,
  },

  botonContainer: {
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "fit-content",
    paddingVertical: 10,
  },
  roundImage: {
    width: 200,
    height: 200,
    borderRadius: 175,
  },
  flatListContainer: {
    width: "100%",
    flexdirection: "row",
  },
  gridImage: {
    width: 200,
    height: 200,
  },
  locationArea: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "blue", // Color de fondo

    shadowColor: "black", // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 3, // Radio de la sombra
    elevation: 3, // Elevación (solo en Android)
    padding: 10, // Espaciado interior
    paddingVertical: 50,
  },
  mapImage: {
    marginTop: 50,
    marginBottom: 50,
    width: "96%",
    height: 400,
    borderRadius: 25,
  },
  itemFlatList: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
