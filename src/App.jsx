import { useEffect, useState } from 'react';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: ((i * 41 + 17) % 94) + 3,
  top: ((i * 59 + 11) % 78) + 5,
  delay: +((i * 0.55) % 7).toFixed(1),
  size: 2 + (i % 3),
  duration: +(5 + ((i * 0.4) % 4)).toFixed(1),
}));

const App = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.querySelector('.hero-section');
    const onParallax = () => {
      if (hero) hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    return () => window.removeEventListener('scroll', onParallax);
  }, []);

  return (
    <div className="app">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="brand">
          <strong>INDIAN BRAVEHEARTS</strong>
          <span>strong alone stronger together</span>
        </div>
        <nav>
          <a href="#home">HOME</a>
          <a href="#about">ABOUT US</a>
          <a href="#work">OUR WORK</a>
          <a href="#supporters">OUR SUPPORTERS</a>
          <a href="#help">HOW CAN YOU HELP?</a>
          <a href="#contact">CONTACT US</a>
          <a className="donate-button" href="#donate">DONATE</a>
        </nav>
      </header>

      <section id="home" className="hero-section home-hero">
        <div className="hero-particles" aria-hidden="true">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-tricolor-bar" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Honoring India's Heroes</p>
          <h1>
            Strong alone,<br />
            <span className="hero-accent">stronger together.</span>
          </h1>
          <p>
            Indian Brave Hearts stands as a beacon of hope for the families of our nation's martyrs.
            We provide unwavering support to widowed women, ensuring they rebuild their lives with
            dignity, strength, and purpose. Every contribution helps heal wounds and honors the
            ultimate sacrifice.
          </p>
          <div className="hero-buttons">
            <a className="primary-button" href="#about">Discover Our Mission</a>
            <a className="secondary-button" href="#donate">Make a Difference</a>
          </div>
        </div>
      </section>

      <div className="impact-strip animate">
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Families Supported</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1,200+</span>
          <span className="stat-label">Children Educated</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">300+</span>
          <span className="stat-label">Widows Empowered</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">Since 2018</span>
          <span className="stat-label">Founded</span>
        </div>
      </div>

      <section className="section panel quick-overview">
        <div className="section-header animate">
          <span className="dot"></span>
          <h2>Our Impact in Action</h2>
        </div>
        <div className="overview-grid">
          {[
            {
              title: 'Empowering Widows',
              text: "Through vocational training and financial literacy programs, we help widows achieve self-reliance. Stories like Priya's, who started her own tailoring business, inspire us to reach more families.",
              delay: '0s',
            },
            {
              title: 'Supporting Children',
              text: 'Education is the foundation of a brighter future. We provide scholarships, school supplies, and mentorship to ensure the children of martyrs never face barriers to learning.',
              delay: '0.15s',
            },
            {
              title: 'Building Community',
              text: 'Our network connects donors, volunteers, and survivors. Together, we create a supportive ecosystem where no family feels alone in their journey toward healing.',
              delay: '0.3s',
            },
          ].map(({ title, text, delay }) => (
            <article key={title} className="animate" style={{ '--delay': delay }}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Why We Exist</h2>
        </div>
        <p>
          In the shadow of India's bravest, families often face unimaginable challenges. Indian Brave
          Hearts was born from the belief that every sacrifice deserves honor, and every survivor
          deserves support. We bridge the gap between government aid and personal needs, offering
          holistic care that restores hope and builds resilience.
        </p>
        <p>
          Join us in this noble cause. Your support helps heal wounds, strengthens communities, and
          ensures that the legacy of our heroes lives on through the families they left behind.
        </p>
      </section>

      <section id="about" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>About Indian Brave Hearts</h2>
        </div>
        <p>
          Founded in 2018, Indian Brave Hearts emerged from a deep commitment to honor the unsung
          heroes who protect our nation. As a registered not-for-profit organization under the Indian
          Trusts Act of 1882, we serve as a lifeline for the families of armed forces martyrs,
          particularly widowed women who face profound loss and uncertainty.
        </p>
        <p>
          Our journey began with a simple yet powerful vision: to ensure that no family of a martyr
          walks alone. We provide comprehensive support—from immediate relief to long-term
          empowerment—creating pathways for healing, education, and financial stability. Every
          program is designed with compassion, rooted in the understanding that behind every uniform
          is a family that deserves unwavering support.
        </p>
        <p>
          Today, Indian Brave Hearts stands as a beacon of hope, connecting survivors with resources,
          volunteers, and donors. We believe that by uplifting these families, we not only honor the
          past but also build a stronger, more resilient India for the future.
        </p>
      </section>

      <section className="section values-section animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Our Guiding Principles</h2>
        </div>
        <ul className="value-list">
          {[
            {
              heading: 'Honor & Respect:',
              body: 'Every life lost in service is a testament to bravery. We treat each family with the reverence they deserve, preserving their dignity through every interaction.',
              delay: '0s',
            },
            {
              heading: 'Transparency & Trust:',
              body: 'Our operations are open and accountable. Donors and beneficiaries alike can track the impact of their contributions, ensuring every rupee serves its purpose.',
              delay: '0.1s',
            },
            {
              heading: 'Empowerment & Independence:',
              body: "We don't just provide aid—we equip families with skills, knowledge, and opportunities to rebuild their lives on their own terms.",
              delay: '0.2s',
            },
            {
              heading: 'Community & Solidarity:',
              body: 'Strength comes from unity. We foster networks of support, where veterans, volunteers, and survivors stand together in resilience and hope.',
              delay: '0.3s',
            },
          ].map(({ heading, body, delay }) => (
            <li key={heading} className="animate" style={{ '--delay': delay }}>
              <strong>{heading}</strong> {body}
            </li>
          ))}
        </ul>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Our Story</h2>
        </div>
        <p>
          Indian Brave Hearts was inspired by real stories of courage and loss. We witnessed firsthand
          how families of martyrs often grapple with financial hardship, emotional trauma, and social
          isolation. Determined to make a difference, our founders—veterans and civilians alike—came
          together to create a platform that bridges gaps and amplifies voices.
        </p>
        <p>
          From humble beginnings, we've grown into a trusted organization, partnering with armed
          forces, NGOs, and philanthropists. Each success story, like that of a widow who became a
          successful entrepreneur, fuels our passion to expand our reach and deepen our impact.
        </p>
      </section>

      <section id="work" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Our Work: Transforming Lives</h2>
        </div>
        <p>
          At Indian Brave Hearts, our work is a testament to the power of compassion and action. We
          address the multifaceted challenges faced by families of martyrs, from immediate crises to
          lifelong aspirations. Our programs are holistic, evidence-based, and tailored to empower
          individuals while honoring their resilience.
        </p>
        <p>
          Through strategic partnerships and community-driven initiatives, we create sustainable
          solutions that foster independence, healing, and hope. Every program is a step toward
          ensuring that the families of our heroes thrive, not just survive.
        </p>
      </section>

      <section className="section grid-section">
        {[
          {
            title: 'Rehabilitation & Counseling',
            text: 'Loss leaves deep scars. Our mental health support includes trauma counseling, grief therapy, and peer support groups. We partner with psychologists to help families process their emotions and rebuild emotional strength.',
            delay: '0s',
          },
          {
            title: 'Vocational Empowerment',
            text: "We offer tailored training in skills like tailoring, computer literacy, and entrepreneurship. Women like Sunita, who now runs a successful boutique, exemplify how our programs turn grief into growth and dependence into self-sufficiency.",
            delay: '0.15s',
          },
          {
            title: 'Education for the Future',
            text: 'Education is non-negotiable. We provide scholarships, tutoring, and school supplies to ensure children of martyrs excel academically. Our mentorship programs connect students with role models, inspiring them to dream big.',
            delay: '0.3s',
          },
        ].map(({ title, text, delay }) => (
          <div key={title} className="feature-card animate" style={{ '--delay': delay }}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Emergency Relief & Financial Aid</h2>
        </div>
        <p>
          When families face immediate crises—medical emergencies, housing needs, or food
          insecurity—we step in with targeted relief. Our emergency fund provides quick, dignified
          support, often bridging the gap until long-term solutions take effect.
        </p>
        <p>
          We also offer micro-loans and financial literacy workshops, helping widows manage finances
          and build savings. These initiatives not only alleviate hardship but also instill confidence
          and control over their futures.
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Community Outreach & Awareness</h2>
        </div>
        <p>
          Raising awareness is key to change. We conduct workshops, seminars, and media campaigns to
          educate the public about the needs of martyr families. By fostering empathy and
          understanding, we build a society that values and supports its protectors.
        </p>
        <p>
          Our outreach extends to schools and communities, where we share stories of courage and
          resilience. These efforts not only garner support but also inspire a new generation to
          honor our armed forces.
        </p>
      </section>

      <section id="supporters" className="section panel supporters-overview animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Our Supporters: Pillars of Strength</h2>
        </div>
        <p>
          Indian Brave Hearts thrives on the generosity and dedication of a diverse community of
          supporters. From the valiant men and women of India's armed forces to everyday citizens
          moved by stories of sacrifice, our partners form the backbone of our mission. Together, we
          create a network of care that reaches every corner of need.
        </p>
        <div className="supporter-grid">
          {[
            {
              icon: 'ARMY',
              label: 'Indian Army',
              sub: 'Our founding partners, providing guidance and resources.',
              delay: '0s',
            },
            {
              icon: 'NAVY',
              label: 'Indian Navy',
              sub: 'Supporting maritime families with specialized outreach.',
              delay: '0.15s',
            },
            {
              icon: 'AIR',
              label: 'Indian Air Force',
              sub: 'Collaborating on aviation-related welfare programs.',
              delay: '0.3s',
            },
          ].map(({ icon, label, sub, delay }) => (
            <div key={icon} className="supporter-card animate" style={{ '--delay': delay }}>
              <div className="supporter-icon">{icon}</div>
              <p>{label}</p>
              <small>{sub}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Corporate & Philanthropic Partners</h2>
        </div>
        <p>
          Leading corporations recognize the value of supporting our heroes' families. Through CSR
          initiatives, they fund vocational training, education scholarships, and emergency relief.
          Companies like Tata, Reliance, and Infosys have partnered with us, demonstrating how
          business can drive social change.
        </p>
        <p>
          Individual philanthropists and foundations provide the flexibility to address unique needs.
          Their contributions enable us to innovate and scale programs that make a lasting difference.
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Volunteers & Community Heroes</h2>
        </div>
        <p>
          Our volunteers are the heart of Indian Brave Hearts. From retired officers mentoring youth
          to young professionals organizing events, each person brings passion and purpose. NGOs and
          community groups amplify our efforts, creating a ripple effect of kindness.
        </p>
        <p>
          Stories abound of volunteers who found their calling through our work. Like Rajesh, a
          corporate executive who now dedicates weekends to teaching computer skills to widows,
          showing how one person's time can change lives.
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Join Our Network</h2>
        </div>
        <p>
          Whether you're an individual, a corporation, or an organization, there's a place for you in
          our mission. Partner with us through donations, volunteering, or advocacy. Together, we can
          ensure that every family of a martyr receives the support they deserve.
        </p>
        <p>
          Contact us today to explore partnership opportunities. Your involvement not only honors the
          past but also secures a brighter future for India's bravest families.
        </p>
      </section>

      <section id="help" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>How Can You Help? Your Role in Healing</h2>
        </div>
        <p>
          The families of India's martyrs have given everything for our safety and freedom. Now, it's
          our turn to give back. Whether you're an individual, a business, or a community leader,
          your support can transform lives. Here are meaningful ways to get involved and make a real
          difference.
        </p>
        <ul className="help-list">
          {[
            {
              heading: 'Donate Generously:',
              body: 'Contribute to our funds for rehabilitation, education, and emergency relief. Even small amounts add up to provide counseling, school supplies, and livelihood training.',
              delay: '0s',
            },
            {
              heading: 'Sponsor Programs:',
              body: "Fund vocational workshops or scholarships. Imagine sponsoring a widow's tailoring course—your investment could help her start a business and regain independence.",
              delay: '0.1s',
            },
            {
              heading: 'Volunteer Your Skills:',
              body: 'Offer mentorship in career development, teach computer literacy, or provide emotional support. Volunteers like you bring hope and practical help to those in need.',
              delay: '0.2s',
            },
            {
              heading: 'Corporate Partnerships:',
              body: 'Through CSR, sponsor events, awareness campaigns, or skill-building initiatives. Companies can create employee volunteer programs that foster team spirit and social impact.',
              delay: '0.3s',
            },
            {
              heading: 'Spread Awareness:',
              body: 'Share our stories on social media, talk to friends and family, or organize local fundraisers. Your voice can inspire others to join this noble cause.',
              delay: '0.4s',
            },
          ].map(({ heading, body, delay }) => (
            <li key={heading} className="animate" style={{ '--delay': delay }}>
              <strong>{heading}</strong> {body}
            </li>
          ))}
        </ul>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Why Your Support Matters</h2>
        </div>
        <p>
          Behind every martyr is a family grappling with profound loss. Widows often face financial
          instability, emotional trauma, and societal challenges. Children may struggle with education
          and identity. Your support bridges these gaps, providing not just aid but dignity and
          opportunity.
        </p>
        <p>
          By helping Indian Brave Hearts, you're honoring the ultimate sacrifice. You're ensuring
          that families don't just survive—they thrive. Your contribution creates ripples of change,
          building a stronger, more compassionate India where heroes' legacies live on through
          empowered families.
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Get Started Today</h2>
        </div>
        <p>
          Ready to make an impact? Start with a donation, sign up to volunteer, or reach out for
          partnership ideas. Every action counts. Contact us at braveheartsindian@gmail.com or visit
          our donate page to begin your journey of giving.
        </p>
        <p>
          Together, we can turn grief into growth, loss into legacy. Join Indian Brave Hearts and be
          part of something truly extraordinary.
        </p>
      </section>

      <section id="donate" className="section panel donate-panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Make a Donation: Change Lives Forever</h2>
        </div>
        <p className="donate-copy">
          Your generosity is the lifeline for families who have lost everything in service to our
          nation. Every rupee you donate goes directly toward rehabilitation, education, and hope.
          Tax-exempt under Sec 80G of Income Tax Act, 1961, your contribution is both impactful and
          rewarding.
        </p>
        <div className="donate-details">
          <p><strong>Account Name:</strong> INDIAN BRAVEHEARTS</p>
          <p><strong>Bank:</strong> AXIS BANK LTD</p>
          <p><strong>Branch Code:</strong> 1363</p>
          <p><strong>IFSC Code:</strong> UTIB0001363</p>
          <p><strong>Account No:</strong> 920010062478401</p>
        </div>
        <p>
          For donation receipts or tax exemption certificates, email us at
          braveheartsindian@gmail.com with your payment details and address. We ensure every donation
          is acknowledged and utilized transparently.
        </p>
        <button className="primary-button donate-pulse">Donate Now</button>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>How Your Donation Helps</h2>
        </div>
        <p>
          Imagine funding a widow's vocational training, enabling her to support her children
          independently. Or sponsoring a child's education, opening doors to a brighter future. Your
          donation makes these stories real.
        </p>
        <ul className="help-list donation-tiers">
          {[
            { amount: '₹1,000:', impact: 'Provides counseling sessions for a grieving family.', delay: '0s' },
            { amount: '₹5,000:', impact: "Funds a month's worth of school supplies for multiple children.", delay: '0.1s' },
            { amount: '₹10,000:', impact: 'Supports a vocational training workshop for widows.', delay: '0.2s' },
            { amount: '₹50,000:', impact: 'Enables emergency relief for a family in crisis.', delay: '0.3s' },
          ].map(({ amount, impact, delay }) => (
            <li key={amount} className="animate" style={{ '--delay': delay }}>
              <strong>{amount}</strong> {impact}
            </li>
          ))}
        </ul>
        <p>
          No amount is too small. Recurring donations ensure sustained support. Join our legacy of
          compassion—donate today and witness the transformation.
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Other Ways to Contribute</h2>
        </div>
        <p>
          Beyond monetary donations, consider sponsoring a program, volunteering, or organizing a
          fundraiser. For corporate donations or large gifts, contact us directly to discuss tailored
          opportunities.
        </p>
        <p>
          Your support isn't just charity—it's an investment in India's future. Thank you for
          standing with Indian Brave Hearts.
        </p>
      </section>

      <section id="contact" className="section panel contact-panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Contact Indian Brave Hearts</h2>
        </div>
        <p>
          Your voice matters. Whether you have questions, want to partner, or need support, we're
          here to listen and respond. Reach out through the form below or our direct channels. Every
          conversation brings us closer to our shared mission.
        </p>
        <div className="contact-grid">
          <input type="text" placeholder="Name *" />
          <input type="email" placeholder="Email ID *" />
          <input type="tel" placeholder="Phone" />
        </div>
        <textarea placeholder="Message *"></textarea>
        <button className="primary-button">Send Message</button>
      </section>

      <section className="section panel contact-details animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Get in Touch Directly</h2>
        </div>
        <p><strong>Phone:</strong> 9810266662, 9810166662</p>
        <p><strong>Email:</strong> braveheartsindian@gmail.com</p>
        <p><strong>Website:</strong> www.indianbravehearts.in</p>
        <p>
          For donations, all payments are exempt from Income Tax under Sec 80G of Income Tax Act,
          1961. Email us your payment details and address to receive an official IT exemption
          certificate.
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Visit Us</h2>
        </div>
        <p>
          Located in the heart of Delhi, our office welcomes visitors for consultations,
          partnerships, or volunteer orientations. Schedule a meeting to learn more about our work
          and how you can contribute.
        </p>
        <p>
          <strong>Address:</strong> [Office Address], New Delhi, India<br />
          <strong>Office Hours:</strong> Monday to Friday, 9 AM - 6 PM
        </p>
      </section>

      <section className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Follow Our Journey</h2>
        </div>
        <p>
          Stay connected through our social media channels for updates, success stories, and ways to
          get involved. Your engagement inspires us to do more.
        </p>
        <p>
          <strong>Social Media:</strong> Follow us on Facebook, Instagram, and Twitter
          @IndianBraveHearts
        </p>
      </section>

      <footer className="site-footer">
        <div className="footer-tricolor" aria-hidden="true" />
        <p>All rights reserved © INDIAN BRAVEHEARTS</p>
      </footer>
    </div>
  );
};

export default App;
