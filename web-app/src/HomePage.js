import React from 'react';
import { EncylopediaNavbar } from './EncylopediaNavbar';
import { DBWrapper } from './DBWrapper';

// Flyweight Pattern 
// Each link for an animal's name is an object
// The link object is stateless and the values are passed in from the HomePage 
class AnimalLink extends React.Component {
  getLinkHTML(animalJSON) {
    // returns the link based on state passed in from HomePage
    const animalID = animalJSON["species_id"]
    const animalName = animalJSON["name"]
    return (
      <>
        <a href={"/species/" + animalID}>{animalName}</a>
        <br></br>
      </>
    )
  }
}

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dbWrapper:null}
  }
  componentDidMount() {
    fetch("http://127.0.0.1:3001/api/getAnimalDB")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Received animal db object from server")
          this.dbWrapper = new DBWrapper(result);
          this.setState({dbWrapper:this.dbWrapper})
        }
      )
  }
  getAnimalListSection() {
    let out = []
    out.push(<h4>Species List</h4>);
    if (this.state.dbWrapper != null) {
      console.log("ANIMAL LIST: \n");
      console.log(this.state.dbWrapper.getAnimalList())
      const animalList = this.state.dbWrapper.getAnimalList()
      const animalLink = new AnimalLink()
      for(let i=0;i<animalList.length;i++) {
        const animalJSON = animalList[i];
        // Flyweight pattern implementation
        // Link object is stateless - value passed in from here
        const animalLinkHTML = animalLink.getLinkHTML(animalJSON);
        out.push(animalLinkHTML);
      }
      return out;
    }
    return <a> Loading animal list</a>;
  }



  render() {
    return (
      <>    
        <EncylopediaNavbar></EncylopediaNavbar>
        {this.getAnimalListSection()}
      </>
    );
  }
}