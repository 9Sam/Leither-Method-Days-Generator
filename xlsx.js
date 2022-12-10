const XLSX = require('xlsx');

let filePath = "./database/database.xlsx";

//TODO Leer el archivo
const workbook = XLSX.readFile(filePath);
// let calendar = workbook.Sheets['calendar'];
// let sheetNames = workbook.SheetNames;
// Obtener los nombres de las hojas

function getData(){
    let worksheets = {};

    for(const sheetName of workbook.SheetNames){
        worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    
    return worksheets
}

let worksheets = getData();

//TODO Modify the XLSX
function insertRows(array){
    array.forEach(el => {
        worksheets.calendar.push({
            "Day": `Day ${el[0]}: `,
            "Levels": `(${Array.of(el[1]).toString()})`
        })
    });
    
    //TODO Update the sheet afeter modification
    XLSX.utils.sheet_add_json(workbook.Sheets["calendar"], worksheets.calendar);
    XLSX.writeFile(workbook, filePath);
}

//TODO Create a new file
function createFile(path,workbookName,sheetName){
    const newBook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.json_to_sheet(worksheets.calendar);
    XLSX.utils.book_append_sheet(newBook, newSheet, sheetName);
    XLSX.writeFile(newBook, `${path}/${sheetName}.xlsx`)
}

// let cellAddress = {c:2, r:2};
// let cell_ref = XLSX.utils.encode_cell(cellAddress);
// xs.utils.cell_add_comment(cell_ref, "This is my comment");
function addComment(sheet,cellAddress,comment,hidden){
    console.log(sheet)
    if(!sheet[`${cellAddress}`].c) sheet[`${cellAddress}`].c = [];
    sheet[`${cellAddress}`].c.hidden = hidden;
    sheet[`${cellAddress}`].c.push({a:sheet, t:comment});
}

// addComment(calendar,'B2','This is my own comment',true)

function updateRow(worksheet,cellAddress,value){
    // Where cellAddress = `B5/A3 etc.`.
    XLSX.utils.sheet_add_aoa(worksheet, [[value]], {origin: cellAddress});
    XLSX.writeFile(workbook, filePath);
}

module.exports = {
    insertRows,
    createFile
}