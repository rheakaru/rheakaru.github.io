inputFilePath = 'books_read_populated.csv'

const fs = require('fs');
const csv = require('csv-parser');

let dataFinal = fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try {

    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    //some final operation
});

export function hello() {
  return dataFinal;
}
