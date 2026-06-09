import { useEffect, useRef, useState } from 'react';
import logo from './public/Logo.jpeg';
import anthemVideo from './public/Jan Gan Man.mp4';
import founderPhoto from './public/Faces/Col. D.K. Dass.png';
import sarahPhoto from './public/Faces/Sarah D Rawat.jpg';
import flag from './public/indian-flag.png';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setMuted(next);
  };

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
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/jpeg';
    link.href = logo;
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
      <a className="skip-link" href="#home">Skip to main content</a>
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />

      <div className="utility-bar">
        <div className="utility-inner">
          <p className="utility-left">
            <img className="flag-icon" src={flag} alt="Flag of India" />
            A Registered Trust — Indian Trusts Act, 1882 · Donations exempt under Sec. 80G
          </p>
          <div className="utility-right">
            <a href="tel:+919810266662">+91 98102 66662</a>
            <a href="mailto:dilipkdass@gmail.com">dilipkdass@gmail.com</a>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#home">
            <img className="brand-logo" src={logo} alt="Indian Bravehearts logo" />
            <span className="brand-text">
              <strong>INDIAN BRAVEHEARTS</strong>
              <span>Strong Alone, Stronger Together</span>
            </span>
          </a>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#founder">Founders</a>
            <a href="#work">Our Work</a>
            <a href="#leadership">Leadership</a>
            <a href="#help">How To Help</a>
            <a href="#contact">Contact</a>
            <a className="donate-button" href="#donate">Donate</a>
          </nav>
        </div>
      </header>

      <section id="home" className="hero-section home-hero">
        <video
          ref={videoRef}
          className="hero-video"
          src={anthemVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <button
          type="button"
          className="hero-mute-toggle"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute national anthem' : 'Mute national anthem'}
        >
          {muted ? '🔇 Play Anthem' : '🔊 Mute'}
        </button>
        <div className="hero-tricolor-bar" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">In Service of Those Who Served</p>
          <h1>
            For your tomorrow,<br />
            <span className="hero-accent">they gave their today.</span>
          </h1>
          <p>
            Indian Bravehearts is a not-for-profit trust devoted to the welfare, rehabilitation and
            wellbeing of the entire armed-forces fraternity — all personnel under the Ministry of
            Defence and the Ministry of Home Affairs, serving and retired, including veterans, battle
            casualties, war widows, orphans and their families.
          </p>
          <div className="hero-buttons">
            <a className="primary-button" href="#about">Our Mission</a>
            <a className="secondary-button" href="#donate">Stand With Them</a>
          </div>
        </div>
      </section>

      {/* ─── About / Mission ──────────────────────────────────────────── */}
      <section id="about" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Who We Are</h2>
        </div>
        <blockquote className="mission-quote">
          “When you go home, tell them of us and say — for your tomorrow, we gave our today.”
          <cite>The soldier's epitaph</cite>
        </blockquote>
        <p>
          Indian Bravehearts is a not-for-profit NGO registered under The Indian Trusts Act, 1882,
          and a proud initiative of an Army officer. We envision the welfare, rehabilitation and
          wellbeing of the Indian Bravehearts fraternity — all armed forces of the Union under the
          Ministry of Defence and the Ministry of Home Affairs, both serving and retired — including
          the veterans, battle casualties, war widows, orphans and their families.
        </p>
        <p>
          Through this platform our endeavour is to create awareness in society about their specific
          issues and problems, to garner support from all quarters for their inclusive growth and the
          resolution of their difficulties, and to coordinate and synergize the humanitarian efforts
          for this community. We also seek to provide a cohesive platform for those doing well within
          the fraternity to care for the deprived — irrespective of religion, caste and status, a
          hallmark of the Forces.
        </p>
        <p>
          A famous adage reminds us why this work matters: we must render assistance, in whatever way
          possible, for the families of the martyrs, the war widows, and the aged and infirm
          veterans. It is now that they require our care and support to live their today.
        </p>
      </section>

      {/* ─── The realities they live with ─────────────────────────────── */}
      <section className="section animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>The Realities They Live With</h2>
        </div>
        <p>
          The challenges faced by the armed-forces fraternity are unlike those of any other
          profession, arising from the very nature of the duties they perform. Understanding them is
          the first step toward standing with these families.
        </p>
        <div className="realities-grid">
          {[
            {
              title: 'Risk to Life',
              text:
                'Beyond the obvious risk from enemy action, terrorism and internal-security duties, soldiers face hazards the public rarely sees — death and injury during intensive training, in avalanches, high-altitude pulmonary edema and frostbite, and from live-ammunition and weapon-system failures. The stress of soldiering and early retirement leave many with a reduced life span of just 57–62 years, well below the national average.',
            },
            {
              title: 'Psychological Strain',
              text:
                'Isolation and even hallucinations on remote posts along the LoC and at high altitude, the mental stress of being cut off from family, and the inability to take leave due to unit commitments take a heavy toll — at times leading to suicide, fratricide or desertion.',
            },
            {
              title: 'Lack of Family Life',
              text:
                'Prolonged separation due to field postings, shortage of married accommodation, and constant operational alerts mean families often fend for themselves. Frequent transfers disrupt children’s schooling and prospects, the financial burden of running two establishments mounts, and the life of a young widow is made harder still by the absence of administrative support.',
            },
            {
              title: 'Early Retirement',
              text:
                'Unlike most government service, retirement in the forces is by length of service, not age — a Sepoy retires at about 35, a Havildar at 40, a Colonel at 54. Many must seek a second career while still raising children and settling a home, often without the qualifications the civilian market demands.',
            },
          ].map(({ title, text }, i) => (
            <article key={title} className="reality-card animate" style={{ '--delay': `${i * 0.1}s` }}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── About the Founders ───────────────────────────────────────── */}
      <section id="founder" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>About the Founders</h2>
        </div>
        <p>
          Indian Bravehearts was built by people who have lived the life it serves — a soldier who
          spent a career on the nation’s hardest frontiers, and an officer’s wife who has carried the
          story of the fraternity’s families to stages across the country and the world.
        </p>

        <div className="founder-grid">
          <div className="founder-aside">
            {founderPhoto ? (
              <img className="founder-photo" src={founderPhoto} alt="Colonel DK Dass" />
            ) : (
              <div className="founder-photo-placeholder" aria-hidden="true">DKD</div>
            )}
            <span className="founder-name">Colonel DK Dass</span>
            <span className="founder-role">Founder &amp; Chairman</span>
          </div>
          <div className="founder-body">
            <p>
              Colonel DK Dass is, in his own words, a “Fauji to the Core.” Born into a defence family
              — his father an Air Force officer — he was schooled at the Rashtriya Military School,
              Bangalore. After graduating from Delhi University he was commissioned into the Indian
              Army as a Gunner (Artillery), retiring as a Colonel after a demanding career on the
              nation’s hardest frontiers: Sikkim on the China border, the icy heights of Siachen,
              the volatile Line of Control, and the terrorism-hit Kupwara sector of the Kashmir
              Valley — along with a tenure at the Directorate General of Quality Assurance, Ministry
              of Defence.
            </p>
            <p>
              After the Army, he became an accomplished Rotarian with the Rotary Club of Delhi South
              Metropolitan, devoting two decades to social and welfare projects for the
              underprivileged. Drawing on first-hand knowledge of the travails of armed-forces
              personnel and their families, he founded Indian Bravehearts — a trust focused wholly on
              the welfare, rehabilitation and wellbeing of veterans, their families and war widows
              (Veer Naaris).
            </p>
            <ul className="founder-recognitions">
              <li><strong>Paul Harris Fellow</strong> — Rotary International, District 3011.</li>
              <li>President of his Home Club (2011–12), awarded the <strong>‘Diamond President’</strong> and <strong>‘Diamond Club’</strong> honours by the District Governor.</li>
              <li>Recipient of a <strong>Citation</strong> from the President, Rotary International (Connecticut, USA), for dedicated and selfless service.</li>
            </ul>
            <blockquote className="founder-note">
              “My efforts have been appreciated by the Hon’ble National Security Advisor, Sh Ajit
              Doval KC, through a DO letter. I am also in regular touch with the Hon’ble Prime
              Minister, Sh Narendra Modi ji, and apprise him on various national and strategic
              issues.”
            </blockquote>
          </div>
        </div>

        <div className="founder-grid founder-reverse">
          <div className="founder-aside">
            <img className="founder-photo" src={sarahPhoto} alt="Sarah D. Rawat" />
            <span className="founder-name">Sarah D. Rawat</span>
            <span className="founder-role">Co-Founder &amp; Speaker</span>
          </div>
          <div className="founder-body">
            <p>
              Sarah D. Rawat is a co-founder of Indian Bravehearts and the proud wife of a defence
              officer — a vantage point from which she has witnessed first-hand the quiet sacrifices
              made by the families of the armed forces. An MBA specialising in marketing and
              advertising, she stepped away from a corporate career as a Business Development Manager
              to devote herself to social work, and today leads the trust’s efforts for the wives of
              defence martyrs (Veer Naaris) and the wider cause of women’s empowerment.
            </p>
            <p>
              A motivational speaker and stage performer, Sarah has carried the story of martyrs’
              wives and the message of women’s empowerment to audiences across India and abroad —
              including two TEDx stages, JoshTalks, SheThePeople TV, and diplomatic events for several
              embassies in Delhi. She is also a published author; her debut novel,
              <em> Breaking Down the Riverine Girl</em>, is available across major platforms.
            </p>
            <ul className="founder-recognitions">
              <li><strong>Rex Karamveer Global Fellowship</strong> (2019 &amp; 2023), supported by iCONGO and the United Nations.</li>
              <li><strong>United Nations Women Icon Award</strong> — Embassy of the Czech Republic, Delhi (2021).</li>
              <li><strong>51 Most Influential Women of Delhi</strong> — Brijbhumi Foundation (2019).</li>
              <li>Honoured for her initiative for <strong>war widows of the Indian Army</strong> — Braveheart Martyrs Foundation, Hyderabad (2019), among numerous other national and international recognitions.</li>
            </ul>
            <blockquote className="founder-note campaign">
              <strong>Green Periods —</strong> Sarah leads the trust’s flagship women’s-health
              campaign built around MYCARA biodegradable sanitary pads, working to make safe, healthy
              and dignified menstruation possible for every woman.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── Our Work / Projects Executed ─────────────────────────────── */}
      <section id="work" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Our Work</h2>
        </div>
        <p>
          Our work is a testament to action over sentiment. From honouring the fallen to rebuilding
          livelihoods, every project is designed to deliver dignity and practical support to the
          fraternity and its families. Among the projects executed:
        </p>
        <ul className="help-list">
          {[
            {
              heading: 'National Balidan Awards:',
              body: 'Instituted to honour and support the War Widows of the nation.',
            },
            {
              heading: 'Prosthetic Hands:',
              body: 'Supplied free of cost to disabled veterans and family members.',
            },
            {
              heading: 'Skill Training:',
              body: 'Organised for the families of serving soldiers to build self-reliance.',
            },
            {
              heading: 'Awareness & Counselling:',
              body: 'Motivational seminars, workshops and counselling in colleges and schools about the Armed Forces.',
            },
            {
              heading: 'Problem Resolution:',
              body: 'Taking up the problems of veterans and widows with the Ministry of Defence and Service Headquarters.',
            },
            {
              heading: 'Financial Assistance:',
              body: 'Loans and aid for education, girl-child marriages, and self-help groups.',
            },
            {
              heading: 'Liaison with the Forces:',
              body: 'Regular correspondence with the MoD and Service HQs on service and welfare matters.',
            },
          ].map(({ heading, body }, i) => (
            <li key={heading} className="animate" style={{ '--delay': `${i * 0.07}s` }}>
              <strong>{heading}</strong> {body}
            </li>
          ))}
        </ul>
      </section>

      {/* ─── How Can You Help ─────────────────────────────────────────── */}
      <section id="help" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>How Can You Help</h2>
        </div>
        <p>
          Donations, in-kind support, gifting, professional services and volunteering all sustain our
          projects — and no contribution is too trivial. You can make a real difference in their
          lives by choosing to:
        </p>
        <ul className="help-list">
          {[
            {
              heading: 'Organise CSR projects:',
              body: 'Corporate Social Responsibility initiatives for veterans, war widows and their families.',
            },
            {
              heading: 'Support our in-house projects:',
              body: 'Back the ongoing welfare and rehabilitation work directly.',
            },
            {
              heading: 'Adopt for life:',
              body: 'Support a battle casualty, disabled soldier, war widow, aged veteran, an orphan or a braveheart (woman / girl child).',
            },
            {
              heading: 'Maintain a facility:',
              body: 'Sustain a War Memorial, an Old Age / Veteran’s Home, an Ex-Servicemen facility or a hostel.',
            },
            {
              heading: 'Enable rehabilitation:',
              body: 'Provide jobs, vocational and on-the-job training, business opportunities through cooperatives and self-help groups, scholarships, subsistence allowance, support for a girl child’s marriage, or repair of homes for poor families.',
            },
          ].map(({ heading, body }, i) => (
            <li key={heading} className="animate" style={{ '--delay': `${i * 0.07}s` }}>
              <strong>{heading}</strong> {body}
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Bravehearts of Society (secondary mission) ───────────────── */}
      <section className="section panel society-panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>The Bravehearts of Society</h2>
        </div>
        <p>
          Beyond the forces fraternity, Indian Bravehearts also stands with the “Bravehearts of
          Society” — those who battle, day in and day out, for survival against hardship and unsafe
          surroundings. They include abandoned parents who lack basic support systems, the helpless
          victims of rape, acid attacks and human trafficking, street children, and the abandoned
          girl child and orphans living shattered lives.
        </p>
        <p>
          These bravehearts, too, deserve love and care — to be nurtured back to normalcy so they may
          live a reasonably comfortable second life.
        </p>
      </section>

      {/* ─── Governing Body ───────────────────────────────────────────── */}
      <section id="leadership" className="section panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Governing Body</h2>
        </div>
        <p>
          Indian Bravehearts is guided by a body of distinguished veterans and officers who bring
          decades of service and leadership to the cause.
        </p>
        <div className="office-grid">
          {[
            { role: 'Patron', name: 'Lt Gen Arun Sahni' },
            { role: 'Chairman', name: 'Colonel DK Dass' },
            { role: 'President', name: 'Ravi Ranjan Choubey' },
            { role: 'General Secretary', name: 'Capt BN Yadav' },
            { role: 'Treasurer', name: 'Capt SK Trehan' },
          ].map(({ role, name }, i) => (
            <div key={role} className="leader-card animate" style={{ '--delay': `${i * 0.07}s` }}>
              <p className="leader-role">{role}</p>
              <p className="leader-name">{name}</p>
            </div>
          ))}
        </div>
        <div className="directors-block">
          <h4>Directors</h4>
          <ul className="directors-list">
            <li>Maj Gen DN Asija</li>
            <li>Commodore Nitin Rawat</li>
            <li>Wg Cdr AK Pandey</li>
            <li>Maj AK Shrivastav</li>
          </ul>
        </div>
      </section>

      {/* ─── Donate ───────────────────────────────────────────────────── */}
      <section id="donate" className="section panel donate-panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Stand With Them</h2>
        </div>
        <p className="donate-copy">
          Your generosity rebuilds lives. Every contribution goes toward rehabilitation, education
          and the dignity of those who gave everything for the nation. Donations are exempt from
          Income Tax under Sec. 80G of the Income Tax Act, 1961.
        </p>
        <div className="donate-details">
          <p><strong>Account Name:</strong> INDIAN BRAVEHEARTS</p>
          <p><strong>Bank:</strong> AXIS BANK LTD</p>
          <p><strong>Branch Code:</strong> 1363</p>
          <p><strong>IFSC Code:</strong> UTIB0001363</p>
          <p><strong>Account No:</strong> 920010062478401</p>
        </div>
        <p>
          For donation receipts or an 80G tax-exemption certificate, email us at dilipkdass@gmail.com
          with your payment details and address. Every contribution is acknowledged and utilised
          transparently.
        </p>
        <button className="primary-button donate-pulse">Donate Now</button>
      </section>

      {/* ─── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="section panel contact-panel animate">
        <div className="section-header">
          <span className="dot"></span>
          <h2>Contact Us</h2>
        </div>
        <p>
          Whether you wish to partner, volunteer, contribute or simply learn more, we would be glad
          to hear from you. Reach out through the form below or our direct channels.
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
        <p><strong>Phone:</strong> +91 9810266662, +91 9810166662</p>
        <p><strong>Email:</strong> dilipkdass@gmail.com</p>
        <p><strong>Website:</strong> www.indianbravehearts.com</p>
        <p><strong>Facebook:</strong> /IndianBravehearts</p>
        <p><strong>Based in:</strong> New Delhi, India</p>
        <p>
          All donations are exempt from Income Tax under Sec. 80G of the Income Tax Act, 1961. Email
          us your payment details and address to receive an official exemption certificate.
        </p>
      </section>

      <footer className="site-footer">
        <div className="footer-tricolor" aria-hidden="true" />
        <div className="footer-inner">
          <div className="footer-brand">
            <img className="footer-logo" src={logo} alt="Indian Bravehearts logo" />
            <strong>INDIAN BRAVEHEARTS</strong>
            <span>Strong alone, stronger together.</span>
            <img className="footer-flag" src={flag} alt="Flag of India" />
          </div>
          <div className="footer-col">
            <h4>Get in Touch</h4>
            <p>+91 9810266662, 9810166662</p>
            <p>dilipkdass@gmail.com</p>
            <p>www.indianbravehearts.com</p>
            <p>New Delhi, India</p>
          </div>
          <div className="footer-col">
            <h4>The Trust</h4>
            <p>Registered under the Indian Trusts Act, 1882</p>
            <p>Donations exempt under Sec. 80G, Income Tax Act, 1961</p>
            <p>For the armed-forces fraternity — MoD &amp; MHA</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#about">Who We Are</a>
            <a href="#founder">The Founder</a>
            <a href="#work">Our Work</a>
            <a href="#help">How You Can Help</a>
            <a href="#donate">Donate</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Indian Bravehearts. All rights reserved.</p>
          <p>Honouring the sacrifice. Standing with the families left behind.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
