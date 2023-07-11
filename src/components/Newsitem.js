import React, { Component } from 'react'

export default class  Newsitem extends Component {
  render() {
    let {title,description,url,Newsurl,author,date,source}=this.props;
    return (
        <>
        <div className='my-3'>       
        <div className="card" style={{width : "16rem"}}>

        <span class="position-absolute   translate-middle badge rounded-pill bg-danger" style={{left:'85%',top:'0%',zIndex:'1'}}>
                        {source}
          </span>

        <img src={url} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title.slice(0,44)}...</h5>
          <p className="card-text">{description.slice(0,90)}...</p><hr></hr>
          <p className='card-text'><small className='text-blue'>By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={Newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
      </div>
 
      </>
    )
  }
}
