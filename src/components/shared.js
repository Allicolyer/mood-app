import styled from "styled-components";

export const Text = styled.p`
  color: ${p => p.theme.colors.info};
  font-size: ${p => p.theme.fontSizes[3]}px;
  line-height: ${p => p.theme.fontSizes[3] * 1.25}px;
`;

export const Span = styled.span`
  color: ${p => p.theme.colors.info};
  font-size: ${p => p.theme.fontSizes[3]}px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: ${p => p.theme.colors.primary};
  display: inline;
`;

export const Title = styled.h1`
  color: ${p => p.theme.colors.primary};
`;

export const Subtitle = styled.h3`
  color: ${p => p.theme.colors.primary};
`;

export const Layout = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

export const Content = styled.div`
  height: 100%;
  width: 85%;
  margin: 0 auto;
  padding: ${p => p.theme.space[1]}px;
  line-height: ${p => p.theme.fontSizes[3]}px;
  text-align: center;
`;

export const Space = styled.div`
  width: ${p => p.theme.space[4]}px;
  height: ${p => p.theme.space[4]}px;
  flex-shrink: 0;
`;
