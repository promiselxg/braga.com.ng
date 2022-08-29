import styled from 'styled-components';
import { Service } from '../../assets';
import { Section } from '../../components';
import { Typography } from '../../GlobalStyle';
const ServicesWrapper = styled.div`
  padding: 50px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  div.text {
    display: flex;
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 20px;
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;
const ServicesCard = styled.div`
  width: 300px;
  min-height: 250px;
  border-radius: 10px;
  overflow: hidden;
  padding: 35px 30px;
  box-shadow: 0px 0px 20px 0px rgb(102 102 102 / 15%);
  background-color: #ffffff;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
  }
`;
const CardTitle = styled.div`
  padding: 10px 0;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  h2 {
    padding-top: 8px;
  }
`;
const Icon = styled.div`
  background: ${(props) => (props.bg ? props.bg : '')};
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 30px;
`;
const CardInfo = styled.div`
  color: rgba(0, 0, 0, 0.5);
  p {
    font-size: 0.8rem;

    line-height: 1.3rem;
  }
`;
const Services = () => {
  return (
    <Section maxWidth="1000px">
      <ServicesWrapper>
        <div className="text">
          <Typography as="h2" fontSize="2rem" fontWeight="800">
            Our Services
          </Typography>
        </div>
        <div className="container">
          {Service?.map((item, i) => (
            <ServicesCard key={i}>
              <CardTitle>
                {item?.icon && <Icon bg={item?.bg}>{item?.icon}</Icon>}
                <Typography as="h2" fontSize=".85rem" fontWeight="600">
                  {item?.title}
                </Typography>
              </CardTitle>
              <CardInfo>
                <Typography as="p" fontWeight="400" fontSize="0.8rem">
                  {item?.desc}
                </Typography>
              </CardInfo>
            </ServicesCard>
          ))}
        </div>
      </ServicesWrapper>
    </Section>
  );
};

export default Services;
