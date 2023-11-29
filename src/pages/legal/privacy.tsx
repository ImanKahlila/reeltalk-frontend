import React from 'react';
import Link from 'next/link';

const h2 = 'text-xl font-medium';
const h3 = 'text-lg font-medium';
const subheading = 'text-base font-medium';

const PrivacyPage = () => {
  return (
    <section className='mx-auto max-w-2xl px-4 py-12'>
      <header className='text-center'>
        <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis md:text-4xl md:font-semibold'>
          Real Talk Privacy Policy
        </h1>
      </header>
      <div className='mt-5 flex h-fit w-full flex-col gap-6 rounded-lg bg-first-surface px-4 py-6 text-sm tracking-[0.07px] text-high-emphasis md:mt-10'>
        <p>Last Updated: October 22, 2023</p>
        <p>
          Reel Talk Llc. and its affiliates (“Reel Talk,” “we,” “our,” and/or “us”) value the
          privacy of individuals who use our application, websites, and related services
          (collectively, our “Services”). This privacy policy (the “Privacy Policy”) explains how we
          collect, use, and share information from users who use our Services (collectively, “Users”
          or “you”). By using our Services, you agree to the collection, use, disclosure, and
          procedures this Privacy Policy describes. Beyond the Privacy Policy, your use of our
          Services is also subject to our Terms of Service (
          <Link className='text-primary' href={'/legal/terms'}>
            https://www.reeltalk.co/terms
          </Link>
          ).
        </p>

        <div>
          <h2 className={h2}>Information We Collect</h2>
          We may collect a variety of information from or about you or your devices from various
          sources, as described below.
        </div>

        <div>
          <h3 className={h3}>A. Information You Provide to Us. </h3>
          <div className='mt-2'>
            <div className={subheading}>Registration and Profile Information.</div> When you sign up
            for an account, or sign up for notifications or updates, we may collect your name, email
            address, and phone number. If you sign up using a LinkedIn or Facebook account, we will
            also receive information from that service such as your name, email, and workplace.{' '}
          </div>
          <div className='mt-6'>
            <div className={subheading}>Location Information.</div> When you use our Services, we
            receive your precise location information. We use your location information to provide
            personalized job opportunities. We also infer your general location information, for
            example by using your internet protocol (IP) address.
          </div>
          <div className='mt-6'>
            <div className={subheading}>Information Related to App and Website Use.</div> Users may
            provide information about themselves in connection with relationship and connection
            opportunities, contact information, interests, profile photo, race, minority
            affiliations, and similar information.
          </div>
          <div className='mt-6'>
            <div className={subheading}>Communications.</div> If you contact us directly, we may
            receive additional information about you. For example, when you contact our customer
            support team or request to receive updates about our product launches, we may receive
            your name, email address, phone number, the contents of a message or attachments that
            you may send to us, and other information you choose to provide.
          </div>
          <div className='mt-6'>
            <div className={subheading}>Forums.</div> If you post on one of our community forums, we
            collect the information you choose to provide, including comments, messages, and posts.
          </div>
          <div className='mt-6'>
            <div className={subheading}>Payment Information.</div> If a user makes a purchase
            through the Services, payment-related information, such as credit card or other
            financial information, is collected by our third party payment processor on our behalf.
          </div>
        </div>

        <div>
          <h3 className={h3}>B. Information We Collect When You Use Our Services. </h3>
          <div className='mt-2'>
            <div className={subheading}>Device Information.</div> We receive information about the
            device and software you use to access our Services, including IP address, web browser
            type, operating system version, phone carrier and manufacturer, application
            installations, device identifiers, mobile advertising identifiers, and push notification
            tokens. 
          </div>
          <div className='mt-6'>
            <div className={subheading}>Usage Information.</div> To help us understand how you use
            our Services and to help us improve them, we automatically receive information about
            your interactions with our Services, like the pages or other content you view, the
            searches you conduct, locations and listings you follow, any content you post, and the
            dates and times of your visits.
          </div>
          <div className='mt-6'>
            <div className={subheading}>Your Contacts.</div> We collect information about your
            contacts if you invite them to use our Services or share information or content with
            them from our Services.
          </div>
          <div className='mt-6'>
            <div className={subheading}>Information from Cookies and Similar Technologies.</div> We
            and third party partners collect information using cookies, pixel tags, or similar
            technologies. Our third party partners, such as analytics and advertising partners, may
            use these technologies to collect information about your online activities over time and
            across different services. Cookies are small text files containing a string of
            alphanumeric characters. We may use both session cookies and persistent cookies. A
            session cookie disappears after you close your browser. A persistent cookie remains
            after you close your browser and may be used by your browser on subsequent visits to our
            Services.
          </div>
          <div className='mt-6'>
            Please review your web browser’s “Help” file to learn the proper way to modify your
            cookie settings. Please note that if you delete or choose not to accept cookies from the
            Service, you may not be able to utilize the features of the Service to their fullest
            potential.
          </div>
        </div>

        <div>
          <h2 className={h2}>How We Use the Information We Collect </h2>
          <p className='mt-2'>We use the information we collect:</p>
          <ul className='mt-2 flex list-disc flex-col gap-1 pl-4'>
            <li>To provide, maintain, improve, and enhance our Services;</li>
            <li>
              To personalize your experience on our Services such as by providing tailored content
              and recommendations;
            </li>
            <li>
              To understand and analyze how you use our Services and develop new products, services,
              features, and functionality;
            </li>
            <li>
              To communicate with you, provide you with updates and other information relating to
              our Services, provide information that you request, respond to comments and questions,
              and otherwise provide customer support;
            </li>
            <li>
              For marketing and advertising purposes, including serving personalized advertisements,
              and developing and providing promotional and advertising materials that may be
              relevant, valuable or otherwise of interest to you;
            </li>
            <li>
              To find and prevent fraud, and respond to trust and safety issues that may arise;
            </li>
            <li>
              For compliance purposes, including enforcing our Terms of Service or other legal
              rights, or as may be required by applicable laws and regulations or requested by any
              judicial process or governmental agency;
            </li>
            <li>
              For other purposes for which we provide specific notice at the time the information is
              collected.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={h2}>How We Share the Information We Collect </h2>
          <div>
            <div className='mt-2'>
              <div className={subheading}>Users.</div> We may share users’ information with other
              users in order to match said users with prospective connections and significant
              others. We provide you with settings which allow you to choose what information is
              shared with other users.
            </div>
            <div className='mt-6'>
              <div className={subheading}>Vendors and Service Providers.</div> We may share any
              information we receive with vendors and service providers retained in connection with
              the provision of our Services.
            </div>
            <div className='mt-6'>
              <div className={subheading}>User Content.</div> Our Services are social in nature,
              allowing you to review content posted by others and post content yourself. In addition
              to the content you post, your username, profile picture, and public profile content
              will also be accessible to other Users on the Service. We are not responsible for the
              other Users’ use of available information, so you should carefully consider whether
              and what to post or how you identify yourself on the Services.
            </div>
            <div className='mt-6'>
              <div className={subheading}>Analytics Partners.</div> We use analytics services such
              as Google Analytics to collect and process certain analytics data. These services may
              also collect information about your use of other websites, apps, and online resources.
              You can learn about Google’s practices by going to{' '}
              <Link
                className='text-primary'
                href={'https://www.google.com/policies/privacy/partners/'}
              >
                https://www.google.com/policies/privacy/partners/
              </Link>
              , and opt-out of them by downloading the Google Analytics opt-out browser add-on,
              available at{' '}
              <Link className='text-primary' href={'https://tools.google.com/dlpage/gaoptout.'}>
                https://tools.google.com/dlpage/gaoptout.
              </Link>
            </div>
            <div className='mt-6'>
              <div className={subheading}>Advertising Partners.</div> We work with third party
              advertising partners to show you ads that we think may interest you. Some of our
              advertising partners are members of the Network Advertising Initiative (
              <Link className='text-primary' href={'http://optout.networkadvertising.org/?c=1#!/'}>
                http://optout.networkadvertising.org/?c=1#!/
              </Link>
              ) or the Digital Advertising Alliance (
              <Link className='text-primary' href={'http://optout.aboutads.info/?c=2&lang=EN'}>
                http://optout.aboutads.info/?c=2&lang=EN
              </Link>
              ). If you do not wish to receive personalized ads, please visit their opt-out pages to
              learn about how you may opt out of receiving web-based personalized ads from member
              companies. You can access any settings offered by your mobile operating system to
              limit ad tracking, or you can install the AppChoices mobile app to learn more about
              how you may opt out of personalized ads in mobile apps. You may also opt out of seeing
              personalized ads on our Services by choosing this setting in your account. If you opt
              out, you may still see contextual ads that are not tailored to you.
            </div>
            <div className='mt-6'>
              <div className={subheading}>As Required By Law and Similar Disclosures.</div> We may
              access, preserve, and disclose your information if we believe doing so is required or
              appropriate to: (a) comply with law enforcement requests and legal process, such as a
              court order or subpoena; (b) respond to your requests; or (c) protect your, our, or
              others’ rights, property, or safety. For the avoidance of doubt, the disclosure of
              your information may occur if you post any objectionable content on or through the
              Services.
            </div>
            <div className='mt-6'>
              <div className={subheading}>Merger, Sale, or Other Asset Transfers.</div> We may
              transfer your information to service providers, advisors, potential transactional
              partners, or other third parties in connection with the consideration, negotiation, or
              completion of a corporate transaction in which we are acquired by or merged with
              another company or we sell, liquidate, or transfer all or a portion of our assets. The
              use of your information following any of these events will be governed by the
              provisions of this Privacy Policy in effect at the time the applicable information was
              collected.
            </div>
            <div className='mt-6'>
              <div className={subheading}>Consent.</div> We may also disclose your information with
              your permission.
            </div>
          </div>
        </div>

        <div>
          <h2 className={h2}>Your Choices</h2>
          <div>
            <div className='mt-2'>
              <div className={subheading}>Sharing Preferences.</div>
              We provide you with settings to allow you to set your sharing preferences for content
              you post to the Services. You may edit certain information, such as the contents of
              your profile, and you may delete your account.
            </div>
            <div className='mt-6'>
              <div className={subheading}>Marketing Communications.</div>
              You can unsubscribe from our promotional emails via the link provided in the emails.
              Even if you opt-out of receiving promotional messages from us, you will continue to
              receive administrative messages from us.
            </div>
            <div className='mt-6'>
              <div className={subheading}>Location Information.</div>
              You can prevent your device from sharing precise location information at any time
              through your device’s operating system settings. However, location is core to our
              Services and without it, you may not be able to successfully use our Services.
            </div>
          </div>
        </div>

        <div>
          <h2 className={h2}>Third Parties</h2>
          <div>
            <p className='mt-2'>
              Our Services may contain links to other websites, products, or services that we do not
              own or operate.  We are not responsible for the privacy practices of these third
              parties. Please be aware that this Privacy Policy does not apply to your activities on
              these third party services or any information you disclose to these third parties. We
              encourage you to read their privacy policies before providing any information to them.
            </p>
          </div>
        </div>

        <div>
          <h2 className={h2}>Security</h2>
          <div>
            <p className='mt-2'>
              We make reasonable efforts to protect your information by using physical and
              electronic safeguards designed to improve the security of the information we maintain.
              However, as our Services are hosted electronically, we can make no guarantees as to
              the security or privacy of your information.
            </p>
          </div>
        </div>

        <div>
          <h2 className={h2}>Children’s Privacy </h2>
          <div>
            <p className='mt-2'>
              We do not knowingly collect, maintain, or use personal information from children under
              13 years of age, and no part of our Services are directed to children. If you learn
              that a child has provided us with personal information in violation of this Privacy
              Policy, then you may alert us at{' '}
              <Link className='text-primary' href={'mailto:reelworldapp@gmail.com'}>
                reelworldapp@gmail.com.
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h2 className={h2}>International Visitors </h2>
          <div>
            <p className='mt-2'>
              Our Services are hosted in the United States and intended for visitors located within
              the United States. If you choose to use the Services from the European Union or other
              regions of the world with laws governing data collection and use that may differ from
              U.S. law, then please note that you are transferring your personal information outside
              of those regions to the United States for storage and processing. Also, we may
              transfer your data from the U.S. to other countries or regions in connection with
              storage and processing of data, fulfilling your requests, and operating the Services.
              By providing any information, including personal information, on or to the Services,
              you consent to such transfer, storage, and processing.
            </p>
          </div>
        </div>

        <div>
          <h2 className={h2}>Update Your Information or Pose a Question </h2>
          <div>
            <p className='mt-2'>
              You can update your account and profile information or close your account through
              settings within the Services. If you have questions about your privacy on the Services
              or this privacy policy, please contact us at{' '}
              <Link className='text-primary' href={'mailto:reelworldapp@gmail.com'}>
                reelworldapp@gmail.com.
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h2 className={h2}>Changes to this Privacy Policy</h2>
          <div>
            <p className='mt-2'>
              We will post any adjustments to the Privacy Policy on this page, and the revised
              version will be effective when it is posted. If we materially change the ways in which
              we use or share personal information previously collected from you through the
              Services, we will notify you through the Services, by email, or other communication.
            </p>
          </div>
        </div>

        <div>
          <h2 className={h2}>Contact Information </h2>
          <div>
            <p className='mt-2'>
              If you have any questions, comments, or concerns about our processing activities,
              please email us at{' '}
              <Link className='text-primary' href={'mailto:reelworldapp@gmail.com'}>
                reelworldapp@gmail.com.
              </Link>{' '}
              or write to us at 6548 Bradley Place, Los Angeles, CA 90056.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
