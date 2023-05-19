export class DBWrapper {
    // Facade design pattern
    // Simplified interface for interacing with the backend database
    constructor(animalDB) {
        this.animalDB = animalDB["animalDB"];
        /*
        animal id's begin at 1
        Format of animal database
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
        
    }

    getAnimalList() {
        var animalList = []
        for (const [key, value] of Object.entries(this.animalDB)) {
            animalList.push(value);
        }
        return animalList;
    }
    getAnimalJSON(animal_id) {
        // Returns the animal's JSON corresponding to the Species_id inputted
        console.log("fsf")
        console.log(animal_id)
        console.log(this.animalDB[animal_id])
        return this.animalDB[animal_id];
    }
}


/*
d.getAnimalList().then((res) => {
    console.log(res);
})*/