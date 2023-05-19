const fs = require("fs");
// Inspiration for Singelton Design From this resource:
// https://medium.com/swlh/node-js-and-singleton-pattern-7b08d11c726a
// External clients can only interface with instance given from SingeltonCSVParser
// PrivateCSVParser is encapsulated
class PrivateCSVParser {
    // This class should only be accessed from this file to remain private
    loadAnimalDB_FromCSV(csvPath = "./db.csv") {
        /* Reads in CSV as rows of a text file
        // parses rows into JSON structure (this.animalDB with format below)
        animalDB{<animal_id>} = animalJSON;
        animalJSON= {
            species_id:Species_id,
            name:Name,
            description:Description
            location:Location,
            status:Status,
            image_link:Image_link
        }
        */
        const file = fs.readFileSync(csvPath, 'utf-8');
        var i = 0;
        var animalDB = {}
        file.split(/\r?\n/).forEach(line => {
            var arr = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            // Don't copy the 1st line of the file
            if (i > 0) {
                const [Species_id, Name, Description, Location, Status, Image_link] = arr;
                const animalJSON = {
                    // slicing removes 1st and last characters which are "
                    species_id: Species_id,
                    name:Name.slice(1,-1),
                    description: Description.slice(1,-1),
                    location: Location.slice(1,-1),
                    status: Status.slice(1,-1),
                    image_link: Image_link
                }
                console.log(animalJSON)
                animalDB[Species_id] = animalJSON;
            }
            i++;
        });
        return animalDB
    }
}

class SingletonCSVParser {
    // Singleton Pattern
    // Only one instance of this class which contains a function
    // for parsing a CSV into a JSON structure (animalDB) )from a CSV file
    constructor() {
        throw new Error('Use animalDBParser.getInstance()');
        // The instance of the class returnde by getInstance
    }
    static getInstance() {
        if (!SingletonCSVParser.instance) {
            SingletonCSVParser.instance = new PrivateCSVParser();
        }
        return SingletonCSVParser.instance;
    }
}

module.exports = SingletonCSVParser;
