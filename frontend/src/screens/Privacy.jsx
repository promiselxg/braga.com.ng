import { Breadcrumb } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components';
import { BreadCrumb } from './BlogScreen';
import styled from 'styled-components';
const TermsWrapper = styled.section`
  min-width: 310px;
  margin: 20px auto 8%;
  border-radius: 2px;
  box-shadow: 2px 4px 8px 0 rgb(0 0 0 / 10%);
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  padding: 25px 6% 3%;

  div {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 8px 0 15px 0;
  }
  .heading {
    margin-bottom: 8px !important;
    font-size: 28px;
    font-weight: 600;
  }
  .heading__small {
    color: #212b36;
    margin-top: 30px;
    font-size: 18px;
    font-weight: 700;
    text-transform: lowercase !important;
  }
  p {
    margin-bottom: 20px !important;
    white-space: pre-wrap;
    font-size: 16px;
    line-height: 1.56;
    color: #222;
  }
  ol,
  ul {
    margin-left: 30px;

    li {
      margin: 10px 0;
    }
  }
  .indent {
    margin-left: 20px;
  }
`;

const Privacy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <BreadCrumb>
        <Section>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/privacy">Privacy Policy</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          {/* <TermsHeader>
            <Link to="/" className="active">
              Terms of Use
            </Link>
            <Link to="/">Payment &amp; Refund Policy</Link>
            <Link to="/">Loading Rules</Link>
          </TermsHeader> */}
          <TermsWrapper>
            <div id="intro">
              <h2 className="heading">Introduction</h2>
              <p>
                BRAGA HOTEL LIMITED appreciates your commitment and trust.
                Please read this Privacy Policy to use our services.
              </p>
            </div>
            <div>
              <h2 className="heading__small">Table of Content</h2>
              <ol>
                <li>Data Collected</li>
                <li>Cases for using your personal data</li>
                <li>Embedded content</li>
                <li>Cookies</li>
                <li>Who has access to your data</li>
                <li>Third party access to your data</li>
                <li>Security measures</li>
                <li>Release of your data for legal purpose</li>
                <li>Amendments</li>
              </ol>
            </div>
            <div id="rules">
              <h2 className="heading__small">Data Collected</h2>
              <ol>
                <li>
                  Information submitted through the contact form or news letter
                  on our site is sent to our company email, hosted These
                  submissions are only kept for customer service purposes they
                  are never used for marketing purposes or shared with third
                  parties
                </li>
                <li>
                  We use Google Analytics on our site for anonymous reporting of
                  site usage. So, no personalized data is stored.
                </li>
              </ol>
            </div>
            <div id="scope">
              <h2 className="heading__small">
                CASES FOR USING THE PERSONAL DATA
              </h2>
              <p>We use your personal information in the following cases:</p>

              <ol>
                <li>
                  Details provided during your stay with us. Which may entail;
                  personal data of dietary habit, health information /
                  disabilities etc.
                </li>
                <li>Information that reach us through parties</li>
                <li>
                  details of transactions (including details of payment cards
                  used) that you carry out on our website.
                </li>
                <li>Providing Technical Assistance;</li>
                <li>
                  Sending updates to our users with important information to
                  inform about news/changes;
                </li>
                <li>
                  Checking the accounts’ activity in order to prevent fraudulent
                  transactions and ensure the security over our customers’
                  personal information;
                </li>
                <li>
                  Customize the website to make your experience more personal
                  and engaging;
                </li>
                <li>
                  Guarantee overall performance and administrative functions run
                  smoothly
                </li>
                <li>Details submitted when booking for our room(s) service.</li>
              </ol>
            </div>
            <div id="contract">
              <h2 className="heading__small">EMBEDDED CONTENT</h2>
              <p>
                Pages on this site may include embedded content, like YouTube
                videos, for example. Embedded content from other websites
                behaves in the exact same way as if you visited the other
                website.
              </p>
              <p>
                These websites may collect data about you, use cookies, embed
                additional third-party tracking, and monitor your interaction
                with that embedded content, including tracking your interaction
                with the embedded content if you have an account and are
                logged-in to that website.
              </p>
            </div>
            <div id="special_contract">
              <h2 className="heading__small">COOKIES</h2>
              <p>
                This site uses cookies – small text files that are placed on
                your machine to help the site provide a better user experience.
                In general, cookies are used to retain user preferences, store
                information for things like shopping carts, and provide
                anonymized tracking data to third party applications like Google
                Analytics. Cookies generally exist to make your browsing
                experience better. However, you may prefer to disable cookies on
                this site and on others. The most effective way to do this is to
                disable cookies in your browser. We suggest consulting the help
                section of your browser.
                <b>NECESSARY COOKIES (ALL SITE VISITORS)</b>
              </p>
            </div>
            <div id="refusal">
              <h2 className="heading__small">WHO HAS ACCESS TO YOUR DATA</h2>
              <p>your personal information can be accessed by:</p>
              <ul>
                <li>Our system administrators.</li>
                <li>
                  Our supporters when they (in order to provide support) need to
                  get the information about the client accounts and access.
                </li>
              </ul>
            </div>
            <div id="cancel">
              <h2 className="heading__small">
                THIRD PARTY ACCESS TO YOUR DATA
              </h2>
              <p>
                We don’t share your data with third-parties in a way as to
                reveal any of your personal information like email, name, etc.
              </p>
            </div>
            <div id="right_to_cancel">
              <h2 className="heading__small">SECURITY MEASURES</h2>
              <p>
                We use the SSL/HTTPS protocol throughout our site. This encrypts
                our user communications with the servers so that personal
                identifiable information is not captured/hijacked by third
                parties without authorization. In case of a data breach, system
                administrators will immediately take all needed steps to ensure
                system integrity, will contact affected users and will attempt
                to reset passwords if needed.
              </p>
            </div>
            <div id="registration">
              <h2 className="heading__small">
                RELEASE OF YOUR DATA FOR LEGAL PURPOSES
              </h2>
              <p>
                At times it may become necessary or desirable to Braga Hotel,
                for legal purposes, to release your information in response to a
                request from a government agency or a private litigant.
              </p>
              <p>
                You agree that we may disclose your information to a third party
                where we believe, in good faith, that it is desirable to do so
                for the purposes of a civil action, criminal investigation, or
                other legal matter. In the event that we receive a subpoena
                affecting your privacy, we may electto notify you to give you an
                opportunity to file a motion to quash the subpoena, or we may
                attempt to quash it ourselves, but we are not obligated to do
                either.
              </p>
              <p>
                We may also proactively report you, and release your information
                to, third parties where we believe that it is prudent to do so
                for legal reasons, such as our belief that you have engaged in
                fraudulent activities. You release us from any damages that may
                arise from or relate to the release of your information to a
                request from law enforcement agencies or private litigants.
              </p>
              <p>
                Any passing on of personal data for legal purposes will only be
                done in compliance with laws of the country you reside in.
              </p>
            </div>
            <div id="checkIn">
              <h2 className="heading__small">AMENDMENTS</h2>
              <p>
                We may amend this Privacy Policy from time to time. When we
                amend this Privacy Policy, we will update this page accordingly
                and require you to accept the amendments in order to be
                permitted to continue using our services.
              </p>
            </div>
          </TermsWrapper>
        </Section>
      </BreadCrumb>
    </>
  );
};

export default Privacy;
