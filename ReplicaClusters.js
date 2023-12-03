/*
Creado por:
    IdBanner:100098659
    Nombre: Esperanza Castro Lombana 

    IdBanner:100096167
    Nombre: Jeison Valencia Sanchez

    Fecha: 2023-12-01,  ©/ todos los derechos reservados
    Corporación Universitaria Iberoamericana


    Conexion al Principal 
    mongodb+srv://Ibero:Ibero1234@ibero.lc4gnep.mongodb.net/

    Nodos Principal
    mongodb+srv://Ibero:Ibero1234@myac-nboire2-shard-00-00.lc4gnep.mongodb.net/ - S
    mongodb+srv://Ibero:Ibero1234@myac-nboire2-shard-00-01.lc4gnep.mongodb.net/ - P
    mongodb+srv://Ibero:Ibero1234@myac-nboire2-shard-00-02.lc4gnep.mongodb.net/ - S



    Conexion al Replica 
    mongodb+srv://Ibero:Ibero1234@ibero1.4zxggd4.mongodb.net/

    Nodos Replica
    mongodb+srv://Ibero:Ibero1234@myac-c2gmsja-shard-00-00.4zxggd4.mongodb.net/ - S
    mongodb+srv://Ibero:Ibero1234@myac-c2gmsja-shard-00-01.4zxggd4.mongodb.net/ - P
    mongodb+srv://Ibero:Ibero1234@myac-c2gmsja-shard-00-02.4zxggd4.mongodb.net/ - S
    
*/



// Importados el modulo para trabajar con MongoDB
const { MongoClient } = require('mongodb');


// Conexion URL ClusterPrincipal
const urlPrincipal = 'mongodb+srv://sa:1234@ibero.lc4gnep.mongodb.net/';
const clientPrincipal = new MongoClient(urlPrincipal);

// Conexion URL ClusterReplica
const urlReplica = 'mongodb+srv://sa:1234@ibero1.4zxggd4.mongodb.net/';
const clientReplica = new MongoClient(urlReplica);

// Nombre de la base de datos 
const dbName = 'Torneo';


// Funcion Async para procesos del Cluster Principal
async function mainPrincipal(Coleccion, Opcion, DatosParaIngresar, DatosBusca, DatoActualiza, DatosParaBorrar,) {
    // Meto para conectar con el cluster
    await clientPrincipal.connect();
    console.log('Conectado con Cluster Principal');

    //Conectamos con la base de datos
    const db = clientPrincipal.db(dbName);

    //Conectamos con la coleccion 
    const collection = db.collection(Coleccion);


    //Condicional para el manejo de los procesos para mongodb CRUD
    // Create opcion para crear datos
    if (Opcion === 1) {
        const insertResult = await collection.insertMany(DatosParaIngresar);
        console.log('Inserted Resultados =>', insertResult);
    }
    // Read opcion para ver los datos todos
    else if (Opcion === 2) {
        const findResult = await collection.find({}).toArray();
        console.log('Find Resultados =>', findResult);
    }
    // Read opcion para ver los datos uno
    else if (Opcion === 3) {
        const filteredDocs = await collection.find(DatosBusca).toArray();
        console.log(`Find Resultado para ${DatosBusca} =>`, filteredDocs);
    }
    // Update opcion para actualizar los datos
    else if (Opcion === 4) {
        const updateResult = await collection.updateMany( DatosBusca , { $set:  DatoActualiza });
        console.log('Updated documents =>', updateResult);
    }
    // Delete opcion para borrar los datos
    else if (Opcion === 5) {
        const deleteResult = await collection.deleteMany(DatosParaBorrar);
        console.log('Deleted documents =>', deleteResult);
    }
    else {
        console.log('Opcion no valida');
    }

    //Devolvemos finalizado  
    return 'Finalizado Principal';
}


// Funcion Async para procesos del Cluster Replica
async function mainReplica(Coleccion, Opcion, DatosParaIngresar, DatosBusca, DatoActualiza, DatosParaBorrar) {
    // Meto para conectar con el cluster
    await clientReplica.connect();
    console.log('Conectado con Cluster Replica');

    //Conectamos con la base de datos
    const db = clientReplica.db(dbName);

    //Conectamos con la coleccion 
    const collection = db.collection(Coleccion);


    //Condicional para el manejo de los procesos para mongodb CRUD
    // Create opcion para crear datos
    if (Opcion === 1) {
        const insertResult = await collection.insertMany(DatosParaIngresar);
        console.log('Inserted Resultados =>', insertResult);
    }
    // Read opcion para ver los datos todos
    else if (Opcion === 2) {
        const findResult = await collection.find({}).toArray();
        console.log('Find Resultados =>', findResult);
    }
    // Read opcion para ver los datos uno
    else if (Opcion === 3) {
        const filteredDocs = await collection.find(DatosBusca).toArray();
        console.log(`Find Resultado para ${DatosBusca} =>`, filteredDocs);
    }
    // Update opcion para actualizar los datos
    else if (Opcion === 4) {
        const updateResult = await collection.updateMany( DatosBusca , { $set:  DatoActualiza });
        console.log('Updated documents =>', updateResult);
    }
    // Delete opcion para borrar los datos
    else if (Opcion === 5) {
        const deleteResult = await collection.deleteMany(DatosParaBorrar);
        console.log('Deleted documents =>', deleteResult);
    }
    else {
        console.log('Opcion no valida');
    }

    //Devolvemos finalizado  
    return 'Finalizado Replica';
}

//INICIO Espacio para cargar datos que se enviaran a los cluster (Principal y Replica)


/*
1 = Create opcion para crear datos
2 = Read opcion para ver los datos todos
3 = Read opcion para ver los datos uno
4 = Update opcion para actualizar los datos
5 = Delete opcion para borrar los datos
*/
Opcion = 1


//Setear la coleccion con la que se desea trabajar
NombreColeccion = 'TiposBalon'

// Ejemplo Ingresar = [{mama:"AS", papa:"Ol"},{mama:"AS", papa:"Ol"}] - [mama:"AS", papa:"Ol"]
DatosParaIngresar = []

// Ejemplo Actualizar = DatosBusca = { Nombre: "Actua" }, DatoActualiza = { Nombre: "OtrosMas" }
DatosBusca = {}
DatoActualiza = {}

// Ejemplo Borrar = DatosParaBorrar = { Nombre: "q" }
DatosParaBorrar = {}


//FIN Espacio para cargar datos que se enviaran a los cluster (Principal y Replica)





//Seteo de los datos en las funciones de principal y replica
mainPrincipal(NombreColeccion, Opcion, DatosParaIngresar, DatosBusca, DatoActualiza, DatosParaBorrar,)
    .then(console.log)
    .catch(console.error)
    .finally(() => clientPrincipal.close());


mainReplica(NombreColeccion, Opcion, DatosParaIngresar, DatosBusca, DatoActualiza, DatosParaBorrar)
    .then(console.log)
    .catch(console.error)
    .finally(() => clientReplica.close());  