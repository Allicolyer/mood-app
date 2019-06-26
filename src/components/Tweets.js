import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { GET_TWEETS, GET_TIMELINE } from "../utils/Queries";
import MoodMeter from "./MoodMeter";
import { Subtitle, Text } from "./shared";
import { tweetSorter, percent, assignMood } from "../utils/helpers";
import happyBot from "../assets/happyBot.svg";
import neutralBot from "../assets/neutralBot.svg";
import sadBot from "../assets/sadBot.svg";
import loadingBot from "../assets/loadingBot.svg";
import TweetTabs from "./TweetTabs";

const Tweets = ({ map, lat, lng, m, timeline, screen_name }) => {
  let query;
  let variables;
  if (map) {
    query = GET_TWEETS;
    variables = { lat: lat, lng: lng, m: m };
  } else if (timeline) {
    query = GET_TIMELINE;
    variables = { screen_name: screen_name };
  }

  return (
    <Query query={query} variables={variables}>
      {({ loading, error, data }) => {
        if (error)
          return (
            <Text>
              FeelsBot has been overwhelmed with emotion. Please try again.
            </Text>
          );
        let tweets = [];
        let rating = {
          loading: true,
          total: 0,
          joy: { num: "-", tweets: [] },
          anger: { num: "-", tweets: [] },
          sadness: { num: "-", tweets: [] },
          fear: { num: "-", tweets: [] },
          disgust: { num: "-", tweets: [] }
        };
        let percentage = 0;
        if (!loading) {
          tweets = data.tweets;
          rating = tweetSorter(tweets);
          percentage = percent(rating);
        }

        return <TweetWrapper rating={rating} percentage={percentage} s />;
      }}
    </Query>
  );
};

const MeterDiv = styled.div`
  padding-bottom: ${p => p.theme.space[2]}px;
  margin: 0, auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Robot = styled.img`
  height: 150px;
  padding: ${p => p.theme.space[2]}px;
`;

const TweetWrapper = ({ percentage, rating }) => {
  let mood = assignMood(percentage);
  const bots = {
    sad: sadBot,
    neutral: neutralBot,
    happy: happyBot
  };
  return (
    <div>
      <MeterDiv id="meter">
        {rating.total ? (
          <Subtitle> Joy Meter: {percentage}% </Subtitle>
        ) : (
          <div>
            <Subtitle> No Tweets</Subtitle>
            <Text> Feelsbot couldn't find any emotional tweets.</Text>
          </div>
        )}
        {rating.loading ? (
          <div>
            <Robot src={loadingBot} />
            <MoodMeter loading={true} percent={percentage} />
          </div>
        ) : (
          <div>
            <Robot src={bots[mood]} />
            <MoodMeter loading={false} percent={percentage} mood={mood} />
          </div>
        )}
      </MeterDiv>
      <TweetTabs rating={rating} />
    </div>
  );
};

export default Tweets;
