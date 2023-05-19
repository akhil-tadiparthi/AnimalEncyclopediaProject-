import React from 'react';
import { EncylopediaNavbar } from './EncylopediaNavbar';
import { DBWrapper } from './DBWrapper';
export class Animal extends React.Component {
    constructor(animalID) {
        super();
        this.animalID = animalID;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setConservation(status) {
        this.conservation = status;
    }
    setLocation(location) {
        this.location = location;
    }
    setImageLink(imageLink) {
        this.imageLink = imageLink;
    }
    getInfo() {
        // Displays basic information about the available animal
        return (
            <>
                <h4>{this.name}</h4>
                <p><strong>{"Description:"}</strong><br></br>{this.description}</p>
                <p><strong>{"Predominantly Found:"}</strong><br></br>{this.location}</p>
                <p><strong>{"Conservation Status:"}<br></br></strong>{this.conservation}</p>
                <img
                    src={this.imageLink} 
                    alt={"Image of a " + this.name}
                    width={"400px"}
                    height={"auto"}
                  
                ></img>
            </>

        )
    }
}

class AnimalFactory {
    // Factory pattern implementation
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }
    createAnimal(animalID) {
        console.log(animalID)
        const animalInfo = this.dbWrapper.getAnimalJSON(animalID);
        let resAnimal = new Animal();
        const animalName = animalInfo["name"];
        const animalDescription = animalInfo["description"];
        const animalLocation = animalInfo["location"];
        const animalStatus = animalInfo["status"];
        const imageLink = animalInfo["image_link"];
        resAnimal.setName(animalName);
        resAnimal.setDescription(animalDescription);
        resAnimal.setConservation(animalStatus);
        resAnimal.setLocation(animalLocation);
        resAnimal.setImageLink(imageLink)
        
        return resAnimal;
    }
}



export class AnimalViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.animalID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
        this.state = {
            animal: null   
        }
    }
    componentDidMount() {
        fetch("http://127.0.0.1:3001/api/getAnimalDB")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Received animal db object from server")
                    const dbWrapper = new DBWrapper(result);
                    let animalFactory = new AnimalFactory(dbWrapper);
                    let Animal = animalFactory.createAnimal(this.animalID)
                    console.log(Animal)
                    this.setState({
                        animal: Animal
                    });
                }
            )
    }
    render() {
        let out = []
        if (this.state.animal == null) {
            return (
                <>
                    <EncylopediaNavbar></EncylopediaNavbar>
                    <h4>Loading species</h4>
                </>
            )
        }
        else {
            return (
                <>
                    <EncylopediaNavbar></EncylopediaNavbar>
                    {this.state.animal.getInfo()}
                </>
            )
        }
    }
}