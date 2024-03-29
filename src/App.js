
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';

import{
  BrowserRouter as Router ,
  Switch,
  Route,
} from "react-router-dom";


export class App extends Component {
  pageSize=6;
  apiKey=process.env.REACT_APP_NEWS_API //access api key from .env.local

  state={
    progress:0
  }
 
  setProgress=(progress)=>{
    this.setState({progress:progress})

  }
  
  render() {
    return (
      
      <div>
        <Router>

          <NavBar/>
          <LoadingBar
        heoght={3}
        color='#f11946'
        progress={this.state.progress}
        />

          <Switch>
              <Route exact path='/'><News setProgress={this.setProgress}   apiKey={this.apiKey}  key="general"  pageSize={this.pageSize} country={this.props.country} category="general"/></Route>
              <Route exact path='/business'><News setProgress={this.setProgress}    apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={this.props.country} category="business"/></Route>
              <Route exact path='/sports'><News setProgress={this.setProgress}   apiKey={this.apiKey}   key="sports"  pageSize={this.pageSize} country={this.props.country} category="sports"/></Route>
              <Route exact path='/entertainment'><News setProgress={this.setProgress}   apiKey={this.apiKey}  key="entertainment" pageSize={this.pageSize} country={this.props.country} category="entertainment"/></Route>
              <Route exact path='/science'><News setProgress={this.setProgress}   apiKey={this.apiKey}   key="science" pageSize={this.pageSize} country={this.props.country} category="science"/></Route>
              <Route exact path='/technology'><News setProgress={this.setProgress}   apiKey={this.apiKey}   key="technology" pageSize={this.pageSize} country={this.props.country} category="technology"/></Route>
          </Switch>
        
        </Router>
        
      </div>
    )
  }
}

export default App
