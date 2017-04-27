import React, { Component } from 'react';
import { connect } from 'react-redux';
import petfinder, { ANIMALS } from './petfinder-client';
import { setBreed } from './actionCreators';
const pf = petfinder();

class SearchControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: []
    };

    this.handleBreedChange = this.handleBreedChange.bind(this);
    this.handleAnimalChange = this.handleAnimalChange.bind(this);
  }
  componentDidMount() {
    this.getNewBreeds(this.props.animal);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.animal && nextProps.animal !== this.props.animal) {
      this.getNewBreeds(nextProps.animal);
    }
  }
  getNewBreeds(animal) {
    pf.breed.list({ animal }).then(data => {
      if (data.petfinder.breeds) {
        this.setState({ breeds: data.petfinder.breeds.breed });
      }
    });
  }
  handleBreedChange(event) {
    this.props.changeBreed(event.target.value);
  }
  handleAnimalChange(event) {
    this.props.changeAnimal(event.target.value);
  }
  render() {
    let breedSelector = null;
    if (this.props.animal) {
      breedSelector = (
        <select value={this.props.breed} onChange={this.handleBreedChange}>
          <option value="" />
          {this.state.breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
        </select>
      );
    }

    return (
      <div className="search">
        {breedSelector}
        <select value={this.props.animal} onChange={this.handleAnimalChange}>
          <option value="" />
          {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    breed: state.breed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeBreed(breed) {
      dispatch(setBreed(breed));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchControls);
