import { Container, Typography } from '../../GlobalStyle';
import { Column, HeroSectionWrapper, SliderWrapper } from './HeroSection.style';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <>
      <HeroSectionWrapper>
        <Container>
          <SliderWrapper>
            <FiChevronLeft className="icon" />
            <Column
              bg="rgba(0,0,0,0.6)"
              flex="0.4"
              padding="50px 30px"
              borderRadius="8px"
            >
              <Typography
                as="h2"
                fontSize="2rem"
                color="var(--yellow)"
                fontWeight="800"
              >
                Find pleasure in our bar to stay calm.
              </Typography>
              <div className="desc">
                <Typography as="p">Accessible</Typography>|
                <Typography as="p">Reliable</Typography>|
                <Typography as="p">Affordable</Typography>
              </div>
            </Column>
            <Column></Column>
            <FiChevronRight className="icon" />
          </SliderWrapper>
        </Container>
      </HeroSectionWrapper>
    </>
  );
};

export default HeroSection;
