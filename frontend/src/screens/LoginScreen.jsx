import { Button, Section } from '../components';
import { LoginWrapper, SectionWrapper } from '../styles/LoginScreen.style';
import { Container } from '../GlobalStyle';
import { Checkbox } from 'antd';
import { Links } from '../components/NavAnchor';
import { Link } from 'react-router-dom';
const LoginScreen = () => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <>
      <SectionWrapper>
        <Section>
          <Container maxWidth="400px">
            <Link to="/">
              <Button label="Go Back" bg="#ccc" margin="0px 5px" />
            </Link>
            <LoginWrapper>
              <div className="container">
                <form action="">
                  <div className="form-field">
                    <span>Username</span>
                    <input type="text" placeholder="Enter your username" />
                  </div>
                  <div className="form-field">
                    <span>Password</span>
                    <input type="password" placeholder="Enter your password" />
                  </div>
                  <div className="check">
                    <div className="checkbox">
                      <Checkbox onChange={onChange}>Remeber Me</Checkbox>
                    </div>
                    <div className="link">
                      <Links url="/" label="Forgot password?" />
                    </div>
                  </div>
                  <Button label="Login" bg="yellow" />
                </form>
              </div>
            </LoginWrapper>
          </Container>
        </Section>
      </SectionWrapper>
    </>
  );
};

export default LoginScreen;
