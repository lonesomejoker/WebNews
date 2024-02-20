import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country:"us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1); //func to capitalize 1st letter of categories
  }

  constructor(props) {
    super(props); //without super func constructor shows error
    this.state = {
      articles: [], //acess state :- articles
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-Stha News`; //this will change the state of title
  }

  async updateNews() {
    this.props.setProgress(10);//this is for top loading bar
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; //this runs after render()
    /*using fetchapi*/ this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }


  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
   this.setState({page:this.state.page+1})
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; //this runs after render()
    /*using fetchapi*/
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    }); 
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "32px 0px" }}>Stha News -Top HeadLines</h1>
        {this.state.loading && <Spinner />}
        {/*spinner will show only when its loading*/}

{/*Using infinite SCroll*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>} >
          <div className="container">

        <div className="row">
          { this.state.articles.map((element) => {
              //element is passed as a prop

              return (
                <div className="col-md-4" key={element.url}>{" "}{/*elemnt should have 1 unique key*/}
                <NewsItem title={element.title?element.title:" "}description={element.description?element.description:" "}imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}  source={element.source.name}/>
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        </>

      
    );
  }
}

export default News;
