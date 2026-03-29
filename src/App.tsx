import styled from 'styled-components'
import './App.css'
import Background from './Button';
import AsciiRipple from './AsciiRipple';

const Container = styled.div`
  width: 100%;
  height: 120vh;
  margin: 0px auto;
`;

const Main = styled.div`
  box-sizing: border-box;
  width: 1600px;
  margin: 0px auto;
  border: 1px solid #ebebe4;
`;

const Sidebar = styled.div`
  box-sizing: border-box;
  height: 100%;
  border-right: 1px solid #ebebe4;
  width: 180px;
  padding: 20px;
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px 20px;
  border-bottom: 1px solid #ebebe4;
`;

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
`;

function App2() {
  return (
    <Container>
      <Main>
        <Header>
          <h1>Sonny Trujillo Jr.</h1>
        </Header>
        <Body>
          <Sidebar>
            <a href='/1#'>Hello</a>
          </Sidebar>
          <Content>
            <p>Hello world</p>
          </Content>
        </Body>
      </Main>
    </Container>
  )
}


const ContainerGrid = styled.div`
  background: rgba(237, 237, 237);
  height: 100%;
  display: grid;
  grid-template-columns: [first] 140px [line2] 70px [line3] auto [col4-start] 70px [five] 140px [end];
  grid-template-rows: 90px 120px 60px auto;  
`;

const Box = styled.div`
  border-radius: 5px;
  background: rgba(249, 249, 249);
  border-right: 1px solid rgba(237, 237, 237);
  border-bottom: 1px solid rgba(237, 237, 237);
  
  &:hover {
    background: rgba(245, 245, 245);
  }
`;

const HeaderBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: monospace;
  a {
    color: red;
  }
`

function App() {
  return (
    // <Grid>
    <ContainerGrid>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box>
      </Box>
      <HeaderBox>
        <h1>Sonny Trujillo Jr.</h1>
      </HeaderBox>
      <Box />
      <Box />
      <Box />
      <Box />
      <NavBox>
        <a href='https://x.com/sonny_io'>twitter</a>
        <a href='https://www.linkedin.com/in/sonnytrujillo/'>linked-in</a> 
        <a href='mailto:me@sonny.io'>email</a>
      </NavBox>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </ContainerGrid>
    // </Grid>
  )
}

export default App
