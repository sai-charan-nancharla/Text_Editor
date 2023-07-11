import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class Newsapp extends Component {
  pageSize=12;
  APIKey=process.env.REACT_APP_APIKey
  state={
      progress:0
  }

  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      // <div>Local News App is created by {this.name}</div>
      <>
      <Router>
      <LoadingBar
        color='red'
        shadow='true'
        height={3}
        background='black'
        progress={this.state.progress}
      />
      <Navbar />
      
      <div className='bod' style={{backgroundColor:'#e5e5e5'}}>
      <br></br><br></br>

      <Routes>
       
      <Route exact path="/" element={<News setProgress={this.setProgress} APIKey={this.APIKey} pagesize={this.pageSize} category={"general"} title={"Top-Head Lines"}/>}></Route>
      <Route exact path="/sports" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key="sports" pagesize={this.pageSize} category={"sports"} title={"Sports News"}/>}></Route>
      <Route exact path="/entertainment" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key="entertainment" pagesize={this.pageSize} category={"entertainment"} title={"Entertainment News"}/>}></Route>
      <Route exact path="/business" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key="business" pagesize={this.pageSize} category={"business"} title={"Business News"}/>}></Route>
      <Route exact path="/health" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key="health" pagesize={this.pageSize} category={"health"} title={"Health News"}/>}></Route>
      <Route exact path="/technology" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key="technology" pagesize={this.pageSize} category={"technology"} title={"Technology News"}/>}></Route>
      <Route exact path="/science" element={<News setProgress={this.setProgress} APIKey={this.APIKey} key="science" pagesize={this.pageSize} category={"science"} title={"Science News"}/>}></Route>
      

      </Routes>
      </div>
      </Router>

      </>
    )
  }
}
