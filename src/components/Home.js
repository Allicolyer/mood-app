import React, { Component } from "react";
import "../styles/App.css";
import Map from "./Map";
import { Text, Heading } from "rebass";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Heading> Hi, I'm Arnold </Heading>
          <Text>
            {" "}
            I try to assess how humans are feeling by reading their tweets. Test
            out what I can do by using this map. I can also{" "}
            <Link to="Timeline">read your tweets</Link> and tell you how you are
            feeling.{" "}
          </Text>
        </header>
        <Map />
      </div>
    );
  }
}

export default Home;
