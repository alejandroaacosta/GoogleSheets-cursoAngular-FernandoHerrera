/** 
 * DOCUMENTACION
 * https://nodejs.org/es/
 * https://developers.google.com/sheets/api/quickstart/nodejs
 * https://console.developers.google.com/
 * https://developers.google.com/identity/protocols/oauth2/scopes
 * */

const { google } = require('googleapis');
// la constante keys Indica que requiere el archivo donde esta la informacion de las claves
const keys = require('./keys.json');
// el JWT (tokens web json) indica que obtiene los datos de las claves del archivo keys.
const cliente = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    // Este enlace se obtiene de https://developers.google.com/identity/protocols/oauth2/scopes en la seccion Google Sheets API, v4
    ['https://www.googleapis.com/auth/spreadsheets']
);
// En esta funcion se menjan los errores y los tokens
cliente.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('conectado');
        // una vez establecida la coneccion la funcion gsrun pasa todas las credenciales para trabajar con la version v4.
        gsrun(cliente);
    }
});
// las credenciales son pasadas a esta funcion.
async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opciones = {
            spreadsheetId: '1fzdcaWHhSb_GOjgj7fXhjb7wssbkfggy9KDW9vKbxxg',
            range: 'Datos!A1:D10'
        }
        // la variable data esperara hasta que se obtenga la informacion de google shhets mediante el await-
        // antes de cuntinuar con la sigiuente intruccion. 
    let data = await gsapi.spreadsheets.values.get(opciones);
    // console.log(data); // Trae todos los datos
    console.log(data.data.values); // obtiene los datos filtrados

}