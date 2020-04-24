import React, { Component } from 'react';
import api from './api';

class App extends Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      filmes: [],
    }
  }

  async componentDidMount() {
    const response = await api.get('');
    // console.log(response.data)
    this.setState({ filmes: response.data });
  }

    onChange(event){
    const self = this
    const response = api.get('https://api.tvmaze.com/search/shows?q='+event.target.value)
    .then(response=>{
      self.setState({ filmes: response.data });
    })
  }

  render() {

    const filmes  = this.state.filmes;

    return (
      <div>
        <h1>Listar os Filmes</h1>
        <input onChange={this.onChange} />
        {filmes.map(filme => (
          <li key={filme.show.id}>
            <h2>
              <strong>Título: </strong>
              {filme.show.name}
            </h2>
            <p>
              <img src={filme.show.image ? filme.show.image.medium : ''} />              
            </p>
              {filme.show.summary}
          </li>
        ))}
      </div>
    );
  };
};

export default App;
