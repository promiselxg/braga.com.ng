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

const Terms = () => {
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
              <Link to="/terms">Terms</Link>
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
              <h2 className="heading">Terms of Use</h2>
              <p>
                To ensure that this Hotel has public acceptance and provides a
                safe and comfortable stay to guests, the following rules need to
                be followed: Not abiding by these rules may lead to cancellation
                of stay and/or refusal to use the hotel facilities. Further, if
                you happen to damage any equipment or fixtures inside the hotel
                premises, the Hotel reserves a right to charge you the full cost
                of the same
              </p>
            </div>
            <div>
              <h2 className="heading__small">Table of Content</h2>
              <ol>
                <li>Lodging Rules</li>
                <li>Scope of Application</li>
                <li>Conclusion of Accommodation Contract</li>
                <li>Special Contracts Requiring No Accommodation Deposit</li>
                <li>Refusal of Accommodation Contracts</li>
                <li>Right to Cancel Accommodation Contract by the Guest</li>
                <li>Right to Cancel Accommodation Contract by the Hotel</li>
                <li>Registration</li>
                <li>Occupancy Hours of Guest Rooms</li>
                <li>Observance of Hotel Regulations</li>
                <li>Payment of Accommodation Fees</li>
                <li>Liabilities of the Hotel</li>
                <li>When Unable to Provide Contracted Rooms</li>
                <li>Handling of Deposited Articles</li>
                <li>Custody of Baggage and/or Belongings of Guest</li>
                <li>Liability regarding Parking</li>
                <li>Liability of the Guest</li>
                <li>Jurisdiction and Applicable Laws</li>
              </ol>
            </div>
            <div id="rules">
              <h2 className="heading__small">Lodging Rules</h2>
              <ol>
                <li>
                  Do not use the guest rooms for purposes other than intended
                  without authorization.
                </li>
                <li>
                  Do not light fire in the passage or guest rooms for heating or
                  cooking.
                </li>
                <li>
                  To prevent fire, refrain from smoking on bed, in non-smoking
                  rooms, and in any other places prone to catch fire.
                </li>
                <li>
                  The equipment and articles in guest rooms are strictly meant
                  for the guests staying in the Hotel. Hence, inside the guest
                  rooms, use of such equipment and articles by outsiders is
                  prohibited.
                </li>
                <li>
                  Be careful not to move the articles in the Hotel or guest
                  rooms from their fixed places without permission.
                </li>
                <li>
                  Do not change the position of the gadgets and fixtures in the
                  Hotel or guest rooms without permission.
                </li>
                <li>
                  Do not bring the following inside the hotel premises:
                  <ul className="indent">
                    <li>Things giving off foul smell</li>
                    <li>
                      Articles exceeding the normal amount that can be carried
                      into a hotel
                    </li>
                    <li>Guns, swords, weapons etc.</li>
                    <li>
                      Explosives or articles containing volatile oils that may
                      ignite or catch fire
                    </li>
                    <li>
                      Any other articles that may pose a threat to the safety of
                      other guests staying in the Hotel
                    </li>
                  </ul>
                </li>
                <li>
                  Do not scream, sing loudly, or create loud noises by any other
                  actions inside the Hotel or guest rooms, as it may disturb or
                  annoy other guests staying in the Hotel.
                </li>
                <li>
                  Refrain from engaging into gambling or acts that violate
                  public order and morals inside the Hotel or guest rooms
                </li>
                <li>
                  Do not distribute advertisement goods or sell articles to the
                  other guests or collect donation or signatures from them
                  inside the Hotel premises, without proper permission.
                </li>
                <li>
                  Note that we may refuse stay to patients suffering from
                  illnesses that may cause discomfort of any kind to the other
                  guests inside the Hotel.
                </li>
                <li>
                  Do not leave your personal belongings in the passages or the
                  lobby.
                </li>
                <li>
                  Any acts of photography that may bother the other guests in
                  the Hotel are strictly prohibited inside the Hotel or guest
                  rooms.
                </li>
                <li>
                  Any personal meetings should be held only in assigned spots.
                </li>
              </ol>
            </div>
            <div id="scope">
              <h2 className="heading__small">Scope of Application</h2>
              <p>
                Contracts for accommodation and related agreements to be entered
                into between Braga Hotel and the Guest to be accommodated shall
                be subject to these Terms and Conditions. Any particulars not
                provided herein shall be governed by laws and regulations and/or
                generally accepted practices.
              </p>
              <p>
                If the Hotel has entered into a special contract with the Guest
                insofar as such special contract does not violate laws and
                regulations and generally accepted practices the special
                contract shall take precedence over the provisions of these
                Terms and Conditions, notwithstanding the preceding Paragraph.
                <b>Article 2 (Application for Accommodation Contract)</b>
              </p>
              <p>
                A Guest who intends to enter into an Accommodation Contract with
                the Hotel shall notify the Hotel of the following particulars:
              </p>
              <ol>
                <li>
                  Name, address, age, gender, nationality, and occupation of the
                  Guest
                </li>
                <li>Date of accommodation and estimated time of arrival</li>
                <li>
                  Accommodation charges (based in principle on the Basic
                  Accommodation Charges listed); and
                </li>
                <li>
                  Other particulars deemed necessary by the Hotel.
                  <ul className="indent">
                    <li>
                      If Guests request to extend their stay, during their stay
                      at the Hotel, beyond the date in subparagraph (2) of the
                      preceding Paragraph, it shall be regarded as an
                      application for a new Accommodation Contract at the time
                      such request is made.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
            <div id="contract">
              <h2 className="heading__small">
                Article 3 (Conclusion of Accommodation Contracts, etc.)
              </h2>
              <p>
                An Accommodation Contract shall be deemed to have been concluded
                when the Hotel has duly accepted the application as stipulated
                in the preceding Article. However, the same shall not apply
                where it has been proved that the Hotel has not accepted the
                application.
              </p>
              <p>
                The deposit shall be first used for the Total Accommodation
                Charge to be paid by the Guest, secondly for cancellation
                charges under Article 6 and thirdly for reparations under
                Article 17 as applicable. The remainder, if any, shall be
                refunded in the end as stated in Article 11.
              </p>
              <p>
                If the Guest fails to pay the bills by the date as stipulated in
                Paragraph 2 (incase of extended stay) the Accommodation Contract
                shall be treated as invalid. However, the same shall apply only
                in the case where the Guest is thus informed by the Hotel when
                specifying the period of Payment.
              </p>
            </div>
            <div id="special_contract">
              <h2 className="heading__small">
                Article 4 (Special Contracts Requiring No Accommodation Deposit)
              </h2>
              <p>
                Notwithstanding the provisions of Paragraph 2 of the preceding
                Article, the Hotel may enter into a special contract requiring
                no accommodation deposit after the Contract has been concluded
                as stipulated in the same Paragraph.
              </p>
              <p>
                If the Hotel has not requested the payment of the deposit as
                stipulated in Paragraph 2 of the preceding Article and/or has
                not specified the date of payment of the deposit at the time the
                application for an Accommodation Contract has been accepted, it
                shall be treated as though the Hotel has accepted a special
                contract prescribed in the preceding Paragraph.
              </p>
            </div>
            <div id="refusal">
              <h2 className="heading__small">
                Article 5 (Refusal of Accommodation Contracts)
              </h2>
              <p>
                The Hotel may refuse to conclude an Accommodation Contract under
                any of the following circumstances if:
              </p>
              <ul>
                <li>
                  The application for accommodation does not conform with the
                  provisions of these Terms and Conditions;
                </li>
                <li>All the guest rooms in the Hotel are booked;</li>
                <li>
                  The person seeking Hotel accommodation is likely to violate
                  laws and ordinances or act against the public order or good
                  morals regarding his/her accommodation;
                </li>
                <li>
                  The person seeking Hotel accommodation belongs to or is
                  related to an organized crime group or is a recognized
                  criminal or related party of an organized crime group
                  (hereinafter 'crime groups' and 'gangster'), according to the
                  Act on Prevention of Unjust Acts by Organized Crime Group
                  Members (Enforced on March 1, 1992), or is an antisocial
                  element;
                </li>
                <li>
                  The person seeking Hotel accommodation is a member of a
                  corporation or other group managed or administered by a gang
                  or gang members;
                </li>
                <li>
                  The person seeking Hotel accommodation is a member of a
                  corporation, whose employees include one or more gang members
                </li>
                <li>
                  The person seeking Hotel accommodation is a member of a
                  corporation, whose employees include one or more gang members
                </li>
                <li>
                  The person seeking Hotel accommodation performs any act that
                  causes significant disturbance to other guests
                </li>
                <li>
                  The person seeking Hotel accommodation engages into coercive
                  acts such as violence with the Hotel staff, threatening or
                  blackmailing the Hotel staff, or makes an unreasonable demand,
                  or is known to have a past record of similar act(s);
                </li>
                <li>
                  The person seeking Hotel accommodation can be clearly
                  identified as carrying an infectious disease;
                </li>
                <li>
                  The Hotel is unable to provide accommodation due to natural
                  calamities, malfunction of facilities and/or other unavoidable
                  causes;
                </li>
                <li>
                  The person seeking Hotel accommodation is intoxicated and is
                  likely to cause annoyance to other guests
                </li>
                <li>
                  The person seeking Hotel accommodation applies for a room with
                  a hidden intent of raising profit for himself or a third party
                  by engaging into acts such as selling articles anywhere inside
                  the hotel premises or in the Hotel guest room booked by him
                </li>
                <li>
                  The person seeking Hotel accommodation fails to abide by the
                  provisions made under these Terms & Conditions or the
                  provisions regarding payment and/or room cancellation
                  clarified at the time of booking
                </li>
              </ul>
            </div>
            <div id="cancel">
              <h2 className="heading__small">
                Article 6 (Right to Cancel Accommodation Contract by the Guest)
              </h2>
              <p>
                The Guests are entitled to cancel the accommodation contract by
                notifying the Hotel of the same with at least 24 hour's notice.
              </p>
              <p>
                If the Guest has canceled the Accommodation Contract in whole or
                in part due to causes for which the Guest is liable (except when
                the Hotel has requested the payment of the Accommodation Deposit
                in a specified period as prescribed in Paragraph 2 of Article 3
                and the Guest has canceled the contract before the payment). The
                Guest shall pay cancellation charges as listed. However, if a
                special contract as prescribed in Paragraph 1 of Article 4 has
                been concluded, the same shall apply only when the Hotel has
                notified the Guest of his cancellation charge payment obligation
                in case of cancellation by the Guest.
              </p>
              <p>
                If the Guest does not appear by 10:00 p.m. without prior notice
                on the accommodation date, it shall be regarded as cancellation
                of the Accommodation Contract by the Guest.
              </p>
            </div>
            <div id="right_to_cancel">
              <h2 className="heading__small">
                Article 7 (Right to Cancel Accommodation Contract by the Hotel)
              </h2>
              <p>The Hotel may cancel the Accommodation Contract if:</p>
              <ol className="indent">
                <li>
                  The Guest has not shared the particulars requested by the
                  Hotel before the specified date, as provided in Paragraph 1 of
                  Article 2.
                </li>
                <li>
                  The Hotel has requested the payment of the Accommodation
                  Deposit as provided in Paragraph 2 of Article 3, but has not
                  received it by the specified date.
                </li>
                <li>
                  Any of the Paragraphs (3) to (13) of Article 5 are applicable.
                </li>
                <li>
                  The Guest does not observe prohibited actions such as smoking
                  in bed, tampers with fire-fighting facilities and otherwise
                  breaches Hotel Regulations.
                </li>
                <li>
                  If the Hotel has canceled the Accommodation Contract in
                  accordance with the preceding Paragraph, the Hotel shall not
                  charge the Guest for any of the services during the
                  contractual period he/she has not received.
                </li>
              </ol>
            </div>
            <div id="registration">
              <h2 className="heading__small">Article 8 (Registration)</h2>
              <p>
                The Guest shall register the following particulars at the front
                desk of the Hotel on the day of accommodation
              </p>
              <ul>
                <li>
                  Name, age, gender, nationality, and occupation of the Guest
                </li>
                <li>
                  Passport No., port and date of entry in Japan (if the Guest is
                  a foreigner)
                </li>
                <li>Date and estimated time of departure</li>
                <li>Other particulars deemed necessary by the Hotel.</li>
              </ul>
            </div>
            <div id="checkIn">
              <h2 className="heading__small">
                Article 9 (Occupancy Hours of Guest Rooms)
              </h2>
              <p>
                <ul>
                  <li>
                    The Guests staying at the Hotel shall be entitled to use the
                    guest rooms from time of arrival to 11:59 a.m. on the next
                    morning. However, if the Guest is accommodated continuously
                    for some period, the Guest may occupy the guest room all
                    day, except for the days of arrival and departure.
                  </li>
                </ul>
              </p>
              <p>
                <ul>
                  <li>
                    Notwithstanding the provisions prescribed in the preceding
                    Paragraph, the Hotel may permit the Guest to occupy the
                    guest room beyond the time prescribed in the same Paragraph.
                    However, in this case, extra charges may be applicable.
                  </li>
                </ul>
              </p>
            </div>
            <div id="regulations">
              <h2 className="heading__small">
                Article 10 (Observance of Hotel Regulations)
              </h2>
              <p>
                The Guest shall observe the Hotel regulations established by the
                Hotel and posted within the premises of the Hotel.
              </p>
            </div>
            <div id="payment">
              <h2 className="heading__small">
                Article 11 (Payment of Accommodation Fees)
              </h2>
              <p>
                The breakdown and method of calculation of the Accommodation
                charges, etc. to be paid by the Guest is as listed.
              </p>
              <ul className="indent">
                <li>
                  Accommodation charges, etc. as stated in the preceding
                  Paragraph shall be paid in Nigerian currency or US dollars
                  equivalent at the front desk before or at the time of the
                  Guest's arrival or when requested by the Hotel. Other means of
                  payment acceptable to the Hotel are credit cards and
                  transfers.
                </li>
                <li>
                  Accommodation charges shall be paid even if the Guest
                  voluntarily does not utilize the accommodation facilities
                  provided to him/her by the Hotel.
                </li>
              </ul>
            </div>
            <div id="liability">
              <h2 className="heading__small">
                Article 12 (Liabilities of the Hotel)
              </h2>
              <p>
                The Hotel shall pay a compensation amount to the Guest for any
                damage caused to the Guest by the Hotel, in the fulfillment or
                nonfulfillment of the Accommodation Contract and/or related
                agreements. However, the same shall not apply in cases where
                such damage has been caused due to reasons for which the Hotel
                is not liable.
              </p>
              <p>
                The liability of the Hotel regarding accommodation shall start
                as soon as the Guest registers for accommodation at the front
                desk and end as soon as the Guest checks out of the room.
              </p>
            </div>
            <div id="contracted_room">
              <h2 className="heading__small">
                Article 13 (When Unable to Provide Contracted Rooms)
              </h2>
              <p>
                When Unable to Provide Contracted Rooms to the Guest, the Hotel
                shall arrange accommodation of the same standard as far as
                possible elsewhere, with the consent of the Guest.
              </p>
              <p>
                If an alternative arrangement cannot be done despite the
                provisions of preceding Paragraph, the Hotel shall pay a
                compensation fee equivalent to the cancellation charges, and the
                compensation fee shall be applied to reparations. However, if
                the Hotel is not able to provide alternative accommodation due
                to causes for which the Hotel is not liable, the compensation
                fee shall not be paid to the Guest.
              </p>
            </div>
            <div id="deposited_article">
              <h2 className="heading__small">
                Article 14 (Handling of Deposited Articles)
              </h2>
              <p>
                If an article or valuable deposited by the Guest at the front
                desk is broken or damaged or cash deposited at the front desk is
                lost or damaged by the Hotel, the Hotel shall compensate for the
                damage, except in the cases when this has occurred due to causes
                of force majeure.{' '}
              </p>
              <p>
                The Hotel shall compensate the Guest for damages when loss,
                breakage or other damage is caused, through intent or negligence
                on the part of the Hotel, to the goods, cash or valuables
                brought onto the premises of the Hotel by the Guest and are
                deposited at the front desk.
              </p>
              <p>
                Artwork and/or antiques shall not be accepted as deposits at the
                Hotel.
              </p>
            </div>
            <div id="custody">
              <h2 className="heading__small">
                Article 15 (Custody of Baggage and/or Belongings of Guest)
              </h2>
              <p>
                When the baggage of the Guest is brought into the Hotel before
                his/her arrival, the Hotel shall be liable to store it only in
                the case when the Guest's request to keep his baggage has been
                accepted from the Hotel in advance. The baggage shall be handed
                over to the Guest at the front desk at the time of check-in.
              </p>
              <p>
                When the baggage or belongings of the Guest are found after
                check-out and ownership of the article is confirmed, the Hotel
                shall inform the owner of the article left and ask for further
                instructions. When no such instructions are given to the Hotel
                by the owner or when ownership is not confirmed, the valuables
                or articles shall be deposited at the hotel concierge office for
                a period of six months after which the hotel shall dispose of as
                deemed fit.. Any other articles, if not claimed within 6 months
                after they are found, shall be disposed of appropriately.
                However, any food or beverages that may affect the cleanliness
                of the Hotel, and other things such as cigarettes and magazines
                shall be disposed of on the same day on which they are found.
              </p>
              <p>
                The liability of the Hotel to keep the hand baggage and/or
                belongings of the Guest in the cases described in Paragraph 1
                and 2 above shall be as per the provisions of Paragraph 1 and 2
                respectively of the preceding Article.
              </p>
            </div>
            <div id="parking">
              <h2 className="heading__small">
                Article 16 (Liability regarding Parking)
              </h2>
              <p>
                The Hotel shall not be liable for the custody of the vehicle of
                the Guest when the Guest utilizes the parking lot of the Hotel,
                as the Hotel only provides the space for parking and cannot be
                held responsible for management of the vehicle, whether the key
                of the vehicle has been deposited to the Hotel or not.
              </p>
            </div>
            <div id="guest">
              <h2 className="heading__small">
                Article 17 (Liability of the Guest)
              </h2>
              <p>
                The Guest shall compensate the Hotel for any damage caused due
                to intent or negligence on part of the Guest
              </p>
            </div>
            <div id="jursidiction">
              <h2 className="heading__small">
                Article 18 (Jurisdiction and Applicable Laws)
              </h2>
              <p>
                Any disputes regarding the Accommodation Contract between the
                Hotel and the Guest shall be resolved in the summary or district
                court having jurisdiction over the Hotel location and in
                accordance with the Nigeria Law.
              </p>
            </div>
          </TermsWrapper>
        </Section>
      </BreadCrumb>
    </>
  );
};

export default Terms;
