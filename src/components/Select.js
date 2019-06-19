import React, { Component } from "react";
import { Async } from "react-select";
import { autocomplete } from "../utils/query-calls";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { Span, Subtitle, mobile } from "./shared";
import Tweets from "./Tweets";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // Create a ref object

    this.state = {
      screen_name: "",
      render: false,
      autocompleteText: ""
    };
  }

  scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

  handleInputChange = autocompleteText => {
    this.setState({ autocompleteText });
  };

  handleChange = selectedOption => {
    this.setState({
      screen_name: selectedOption.value,
      render: true
    });
    setTimeout(() => {
      this.scrollToMyRef();
    }, 500);
  };

  customStyles = {
    input: () => ({
      fontSize: "1.25em",
      height: "2em",
      padding: "1em 0 0 0",
      color: `${theme.colors.primary}`
    }),
    control: styles => ({
      ...styles,
      border: `1px solid ${theme.colors.primary}`,
      ":hover": {
        border: `1.5px solid ${theme.colors.primary}`
      }
    })
  };

  render() {
    return (
      <div>
        <SelectContainer>
          <Async
            styles={this.customStyles}
            loadOptions={loadOptions}
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
          />
        </SelectContainer>
        <div ref={this.myRef}>
          {this.state.render && (
            <Tweets screen_name={this.state.screen_name} timeline />
          )}
        </div>
      </div>
    );
  }
}

const loadOptions = async autocompleteText => {
  let users = await autocomplete(autocompleteText).then(value => {
    if (value.data.autocomplete) {
      return value.data.autocomplete.map(user => ({
        value: user.screen_name,
        label: (
          <SearchCard>
            <TwitterImage src={user.profile_image_url} />
            <div>
              <UserName>{user.name}</UserName> <br />
              <Span>@{user.screen_name}</Span>
            </div>
          </SearchCard>
        )
      }));
    } else return;
  });
  return users;
};

const SearchCard = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
`;

const TwitterImage = styled.img`
  height: 2em;
  margin: auto 0;
  padding: ${p => p.theme.space[1]}px;
`;

const UserName = styled(Subtitle)`
  display: inline;
`;

const SelectContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  @media ${mobile} {
    width: 80%;
  }
`;
