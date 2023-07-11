import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes  from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export default class News extends Component {


  static defaultProps={

    country:"in",
    pageSize:12,
    category:'general'

  }

  static propTypes={

    country: PropTypes.string,
    pageSize :PropTypes.number,
    category : PropTypes.string
  }


   articles=[]


  constructor(){
    super();
    console.log("News Constructor");
    this.state={
      articles:this.articles,
      loading:false,
      page:1,
      totalResults:0
      
      
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  async updatenews(){

    this.props.setProgress(30);
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-LocalNews`
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    this.props.setProgress(55);
    let parsedData = await data.json();
    
    console.log(parsedData);
    this.props.setProgress(65);
    
    this.setState({
                  articles:parsedData.articles, 
                  loading:false,
                  totalResults:parsedData.totalResults})
    this.props.setProgress(100);

  }

  async componentDidMount(){
    
    console.log("cdm")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKey}&page=1&pageSize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})

    this.updatenews();


  }
  HandlePrevious=async()=>{
    
    console.log("prev")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKey}&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({page:this.state.page-1,
    //     articles:parsedData.articles, loading:false})
    this.setState({page:this.state.page-1})
    this.updatenews();
  }
  HandleNext=async()=>{
    
    console.log("next")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKey}&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({page:this.state.page+1,articles:parsedData.articles,loading:false})
    this.setState({page:this.state.page+1})
    this.updatenews();
  }

  fetchMoreData =async () => {
    this.setState({page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIKey}&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
                  articles:this.state.articles.concat(parsedData.articles), 
                  loading:false,
                  totalResults:parsedData.totalResults})

  };







  render() {
    return (
        
      <>
      <div className="container my-3">
      <h1 style={{ 'margin-top' : '48px'}}>{this.props.title}</h1>
      {this.state.loading && <Spinner/>}
      {/* The following code demonstrates InfiniteScroll in app */}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="container">
      <div className="row">
      {/* !this.state.loading &&  */}
        {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element}>
                     <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} url={element.urlToImage?element.urlToImage:"https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/20_06_2023_21_12_13_3372613.png?width=920&format=jpeg"} Newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>       
                    </div>
        })}
        
        
      </div>
      </div>
      </InfiniteScroll>

       {/* The below code is set for page navigation with buttons */}
        {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.HandlePrevious}>&larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.HandleNext}>Next &rarr;</button>
        </div> */}
      </div>
      </>
    )
  }
}
