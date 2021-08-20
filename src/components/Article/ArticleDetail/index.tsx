import React from "react";

import styled from "@emotion/styled";
import { ReactionButtons } from "components/ReactionButton";

export const ArticleBrief = () => {
  const article = {
    title: '这是一篇文章',
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    subTitle: '发布于sss',
    content: '是打发第三方，沙发，水电费是打发第三方，第三方第三方哒哒哒哒哒哒多多多多多大付，sdaf 大撒发大水发反反复复飞凤飞飞是打发第三方，沙发，水电费是打发第三方，第三方第三方哒哒哒哒哒哒多多多多多大付，sdaf是打发第三方，沙发，水电费是打发第三方，第三方第三方哒哒哒哒哒哒多多多多多大付，sdaf',
  }
  const { title, content, subTitle, reactions } = article;

  return (
    <Container>
      <Title>
        <TitleLink> {title}</TitleLink>
      </Title>
      <SubTitle>{subTitle}</SubTitle>
      <Content>{content}</Content>
      <ReactionButtons article={article} />
    </Container>
  )
}

const Container =styled.div`
  padding: 4rem 0 1rem;
  border-bottom: 1px solid #E1E3E6;
`

const Title =styled.h3`
  margin-bottom: .7rem;
  margin-top: 0;
`

const TitleLink = styled.a`
  text-decoration: none;
`
const SubTitle = styled.div`
  text-decoration: none;
  margin-top: 0;
  font-weight: 400;
  font-size: 1rem;
  color: #73777D;
  margin-bottom: .7rem;
`

const Content = styled.div`
  margin-bottom: 1rem;
`

