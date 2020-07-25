import React, { Component } from "react";
import {
  Container,
  Row,
  Image,
  Col,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import LazyLoad from "react-lazy-load";

let imageStyle = {
  objectFit: "cover",
  maxHeight: "300px",
};

class Gallery extends Component {
  state = {
    images: [],
    keyword: "",
    page: 1,
  };

  componentDidMount() {
    let keyword = localStorage.getItem("keyword");
    let page = localStorage.getItem("page");
    console.log(keyword, page);
    if (keyword) {
      axios
        .get(
          "http://localhost:3031/searchImages?keyword=" +
            keyword +
            "&page=" +
            page
        )
        .then((response) => {
          if (response.data.success) {
            console.log("got images");
            const images = response.data.result.data.results;
            this.setState({ images });
            this.setState({ page });
            this.setState({ keyword });
          } else {
            console.log("error", response.data.result);
          }
        });
    } else {
      localStorage.setItem("keyword", '');
      axios
        .get("http://localhost:3031/getRandomImages?page=" + page)
        .then((response) => {
          if (response.data.success) {
            console.log("got images");
            const images = response.data.result.data;
            this.setState({ images });
            this.setState({ page });
          } else {
            console.log("error");
          }
        });
    }
  }

  getAnotherPage = (page) => {
    localStorage.setItem("page", page);
    if (this.state.keyword) {
      this.searchImages(page);
    } else {
      axios
        .get("http://localhost:3031/getRandomImages?page=" + page)
        .then((response) => {
          if (response.data.success) {
            console.log("got images");
            const images = response.data.result.data;
            this.setState({ images });
            this.setState({ page });
          } else {
            console.log("error");
          }
        });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  searchImages = (page) => {
    console.log(page + ": " + this.state.keyword + ": " + this.state.page);
    axios
      .get(
        "http://localhost:3031/searchImages?keyword=" +
          this.state.keyword +
          "&page=" +
          page
      )
      .then((response) => {
        if (response.data.success) {
          console.log("got images");
          const images = response.data.result.data.results;
          this.setState({ images });
          this.setState({ page });
          localStorage.setItem("keyword", this.state.keyword);
        } else {
          console.log("error", response.data.result);
        }
      });
  };

  resetSearch = () => {
    this.setState({ keyword: "", page: 1 });
    localStorage.setItem("keyword", '');
    localStorage.setItem("page", 1);
    axios
      .get("http://localhost:3031/getRandomImages?page=" + this.state.page)
      .then((response) => {
        if (response.data.success) {
          console.log("got images");
          const images = response.data.result.data;
          this.setState({ images });
        } else {
          console.log("error");
        }
      });
  };

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-between m-3">
          <Pagination>
            <Pagination.Prev
              disabled={this.state.page == 1 ? true : false}
              onClick={() => this.getAnotherPage(this.state.page - 1)}
            />
            <Pagination.Item active>{this.state.page}</Pagination.Item>
            <Pagination.Next
              onClick={() => this.getAnotherPage(this.state.page + 1)}
              disabled={this.state.images.length < 30 ? true : false}
            />
          </Pagination>
          <Row className="justify-content-start">
            <Col>
              <FormControl
                type="text"
                placeholder="i.e. 'minimal'"
                className="mr-sm-2"
                onChange={this.handleSearchChange}
              />
            </Col>
            <Col>
              <Button
                variant="outline-info"
                onClick={() => this.searchImages(1)}
              >
                Search
              </Button>{" "}
              <Button variant="outline-dark" onClick={() => this.resetSearch()}>
                Reset
              </Button>
            </Col>
          </Row>
        </Row>
        <Row>
          {this.state.images.map((image) => {
            return (
              <Col className="m-2" key={image.id} xs={6} md="auto">
                <LazyLoad height={300} offsetVertical={50}>
                  <Image src={image.urls.small} style={imageStyle} rounded />
                </LazyLoad>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Gallery;
