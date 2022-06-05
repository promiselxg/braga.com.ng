import { Container } from '../GlobalStyle';
import styled from 'styled-components';
const SectionWrapper = styled.section`
  background: ${(props) => (props.bg ? props.bg : '')};
`;
const Section = ({ children, ...props }) => {
  return (
    <>
      <SectionWrapper {...props}>
        <Container {...props}>{children}</Container>
      </SectionWrapper>
    </>
  );
};

export default Section;
