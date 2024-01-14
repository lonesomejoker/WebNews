import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props; //this keyword is used in className

    return (
      <div className="my-3">
        <div className="card">
          <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'absolute',
                right:'0'
            }
          }>
          <span className=" badge rounded-pill bg-success">
            {source}
            <span class="visually-hidden">unread messages</span>
          </span>
          </div>
          <img
            src={!imageUrl ?"https://images.macrumors.com/t/REAASGM_7J3pqos4ZbUnkD_JCmQ=/3200x/article-new/2023/09/store-down-wonderlust.jpg":imageUrl}
            className="card-img-top"
            alt="..." />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}.....</p>
            <p class="card=text">
              <small className="text-primary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark" >
              Read More...
            </a>
            
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
