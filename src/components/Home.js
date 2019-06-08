import React, { Component } from "react";
import "../styles/App.css";
import Map from "./Map";
import { Title, Text, Link } from "./shared";

class Home extends Component {
  render() {
    return (
      <div>
        <Title>Hi, I'm FeelsBot </Title>
        <Text>
          {" "}
          I try to assess how humans are feeling by reading their tweets. Test
          out what I can do by using this map. I can also{" "}
          <Link href="/timeline">read your tweets</Link> and tell you how you
          are feeling.{" "}
        </Text>
        <Map />
      </div>
    );
  }
}

export default Home;
