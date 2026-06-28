import { useEffect, useRef, useState } from 'react';
import logo from './public/Logo.jpeg';
import anthemVideo from './public/Jan Gan Man.mp4';
import founderPhoto from './public/Faces/Col. D.K. Dass.png';
import sarahPhoto from './public/Faces/Sarah D Rawat.jpg';
import flag from './public/indian-flag.png';
import aksharLogo from './public/Projects/Akshar/Photo from Piyush Pandey.jpg';
import preetiPhoto from './public/Projects/Akshar/IMG-20260621-WA0034.jpg';
import ak1 from './public/Projects/Akshar/IMG-20260621-WA0011.jpg';
import ak2 from './public/Projects/Akshar/IMG-20260621-WA0019.jpg';
import ak3 from './public/Projects/Akshar/IMG-20260621-WA0027.jpg';
import ak4 from './public/Projects/Akshar/IMG-20260621-WA0024.jpg';
import ak5 from './public/Projects/Akshar/IMG-20260621-WA0023.jpg';
import ak6 from './public/Projects/Akshar/IMG-20260621-WA0014.jpg';
import ak7 from './public/Projects/Akshar/IMG-20260621-WA0029.jpg';
import ak8 from './public/Projects/Akshar/IMG-20260621-WA0003.jpg';
import ak9 from './public/Projects/Akshar/IMG-20260621-WA0006.jpg';
import ak10 from './public/Projects/Akshar/IMG-20260621-WA0004.jpg';
import ak11 from './public/Projects/Akshar/IMG-20260622-WA0018.jpg';

const aksharGallery = [
  { src: ak1, cap: 'With the Indian Army at a school in the Kashmir valley' },
  { src: ak2, cap: 'New desks and learning materials reach the classroom' },
  { src: ak3, cap: 'Sarah and Preeti with the children of Akshar' },
  { src: ak4, cap: 'An open-air classroom against the mountains' },
  { src: ak5, cap: 'The Army and our team with the village children' },
  { src: ak6, cap: 'A quiet moment with the students' },
  { src: ak7, cap: 'Lessons resume on freshly delivered furniture' },
  { src: ak8, cap: 'Honouring the legacy at an Army memorial near the LoC' },
  { src: ak9, cap: 'At the regimental museum of valour' },
  { src: ak10, cap: 'Boniyar — five kilometres from the Line of Control' },
  { src: ak11, cap: 'Carrying the mission to a national platform' },
];

// Eagerly load every photo in the project folders (Akshar handled separately above).
const projectImages = import.meta.glob(
  ['./public/Projects/**/*.jpg', '!./public/Projects/Akshar/**'],
  { eager: true, import: 'default' }
);

const folderImages = (folder) =>
  Object.entries(projectImages)
    .filter(([key]) => key.includes(`/Projects/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);

// Each project folder also carries a single PNG brand logo.
const projectLogos = import.meta.glob('./public/Projects/**/*.png', {
  eager: true,
  import: 'default',
});

const folderLogo = (folder) => {
  const found = Object.entries(projectLogos).find(([key]) =>
    key.includes(`/Projects/${folder}/`)
  );
  return found ? found[1] : null;
};

// Full content for each of the five core-pillar projects.
const extraProjects = [
  {
    id: 'green-period',
    name: 'Green Period',
    icon: '🌿',
    status: 'Past Initiative · Nationwide',
    strap: 'For Mother Earth. For Every Woman.',
    sub: 'Sustainability · Menstrual Health · Dignity',
    blurb: 'Eco-friendly, biodegradable menstrual care for women across India.',
    partner: { label: 'Mykara', note: 'biodegradable sanitary pads' },
    intro: [
      "Green Period is our pledge to the planet and to every woman — a movement to make menstruation safe, dignified and sustainable. In collaboration with Mykara, we promote biodegradable sanitary pads that protect women’s health without costing the earth.",
      "Every year, conventional sanitary products add mountains of non-biodegradable plastic to our landfills. Green Period offers a better way: eco-friendly products that decompose naturally, paired with awareness drives that break the silence around menstrual health across India.",
    ],
    highlights: [
      { big: '100%', label: 'biodegradable — products that return to the earth' },
      { big: 'Zero', label: 'plastic, waste and shame removed from the cycle' },
      { big: 'Every Woman', label: 'safe, sustainable choices, across India' },
    ],
    focus: [
      { title: 'Sustainable by Design', text: 'Biodegradable pads, with Mykara, that decompose naturally — cutting the plastic waste of conventional products.' },
      { title: 'Menstrual Dignity', text: 'Safe, hygienic and affordable products so no woman has to compromise her health or her dignity.' },
      { title: 'Awareness & Education', text: 'Breaking taboos through open conversation and community sessions on menstrual health.' },
      { title: 'For Mother Earth', text: 'A cleaner planet, one cycle at a time — protecting the environment for the generations to come.' },
    ],
    quote: 'For Mother Earth. For every woman — healthy periods, a healthier planet.',
    // NOTE: placeholder sample numbers — replace with real figures before launch.
    metrics: [
      { v: '15,000+', l: 'Pads Distributed' },
      { v: '6,000+', l: 'Women Reached' },
      { v: '35', l: 'Awareness Drives' },
      { v: '₹4.5 L', l: 'Funds Raised' },
    ],
  },
  {
    id: 'handloom',
    name: 'Handloom',
    icon: '🧵',
    status: 'Past Initiative · Across India',
    strap: 'Be Vocal for Local.',
    sub: 'Heritage · Artisans · Vocal for Local',
    blurb: 'Empowering India’s handloom weavers with a platform, visibility and market access.',
    intro: [
      "Handloom is our tribute to the hands that weave India’s heritage. Honouring the Prime Minister’s call to be Vocal for Local, we work directly with handloom artisans and craft communities — giving the weavers of our nation the platform, visibility and market access their artistry deserves.",
      "Behind every handwoven textile is a family, a tradition and centuries of skill. Yet too many artisans struggle to reach the audiences who value authentic Indian craft. Handloom bridges that gap — connecting makers to markets and keeping a living heritage alive.",
    ],
    highlights: [
      { big: 'Vocal for Local', label: 'the swadeshi promise, in action' },
      { big: 'Artisan-First', label: 'weavers and crafts at the centre' },
      { big: 'Living Heritage', label: 'tradition, sustained for the future' },
    ],
    focus: [
      { title: 'Vocal for Local', text: 'Championing indigenous weavers and the swadeshi spirit, in answer to the nation’s call.' },
      { title: 'Platform & Visibility', text: 'Showcasing artisans’ craft to audiences who value authentic Indian heritage.' },
      { title: 'Market Access', text: 'Direct routes to buyers, exhibitions and fair opportunities that sustain livelihoods.' },
      { title: 'Preserving Heritage', text: 'Keeping traditional weaves and crafts alive for the next generation.' },
    ],
    quote: 'Be Vocal for Local — every thread tells the story of India.',
    // NOTE: placeholder sample numbers — replace with real figures before launch.
    metrics: [
      { v: '120+', l: 'Artisans Supported' },
      { v: '8', l: 'Exhibitions Held' },
      { v: '500+', l: 'Products Showcased' },
      { v: '₹3 L', l: 'Funds Raised' },
    ],
  },
  {
    id: 'women-empowerment',
    name: 'Women Empowerment',
    icon: '💪',
    status: 'Past Initiative · Nationwide',
    strap: 'Restart. Rebuild. Rise.',
    sub: 'Career Restart · Mentorship · Independence',
    blurb: 'Helping women return to work and become financially independent leaders.',
    intro: [
      "Women Empowerment is about second chances and new beginnings. Through our Career Restart Series and mentorship programmes, we help women re-enter the workforce, discover work-from-home opportunities, and build the skills and confidence to lead.",
      "Talent does not disappear during a career break — it simply waits for an opportunity. We create that opportunity, walking with women as they restart, rebuild and rise into financially independent leaders within their families and communities.",
    ],
    highlights: [
      { big: 'Restart', label: 'back to work, on her own terms' },
      { big: 'Rebuild', label: 'skills, confidence and income' },
      { big: 'Rise', label: 'independent women, stronger families' },
    ],
    focus: [
      { title: 'Career Restart Series', text: 'Structured programmes that help women return to work after a break.' },
      { title: 'Mentorship & Guidance', text: 'One-on-one support and role models who light the way forward.' },
      { title: 'Skills for Independence', text: 'Practical, market-ready skills and work-from-home pathways.' },
      { title: 'Leadership', text: 'The confidence to lead at home, at work and in the community.' },
    ],
    quote: 'Restart. Rebuild. Rise — when a woman rises, her whole family rises with her.',
    // NOTE: placeholder sample numbers — replace with real figures before launch.
    metrics: [
      { v: '800+', l: 'Women Mentored' },
      { v: '150+', l: 'Careers Restarted' },
      { v: '45', l: 'Sessions Held' },
      { v: '₹2.5 L', l: 'Funds Raised' },
    ],
  },
  {
    id: 'child-welfare',
    name: 'Child Welfare',
    icon: '👧',
    status: 'Past Initiative · Across India',
    strap: 'Every Child. Every Right.',
    sub: 'Education · Rights · Opportunity',
    blurb: 'Education and support so every child can learn, grow and lead.',
    intro: [
      "Child Welfare begins with a simple belief: education is every child’s birthright. Through our education initiatives under Indian Bravehearts, we open doors to learning, resources and support for the children who need them most.",
      "A child with access to education is a changemaker in the making. We invest in the next generation — building confident, capable young people through learning, mentorship and the support systems that help them thrive.",
    ],
    highlights: [
      { big: 'Every Child', label: 'no one left behind' },
      { big: 'Every Right', label: 'education as a birthright' },
      { big: 'Next Generation', label: 'changemakers in the making' },
    ],
    focus: [
      { title: 'Right to Learn', text: 'Access to education for every child, regardless of circumstance.' },
      { title: 'Resources & Support', text: 'Books, materials and learning environments that make school possible.' },
      { title: 'Mentorship', text: 'Guidance and role models who help children dream bigger.' },
      { title: 'Building Changemakers', text: 'Confident, capable young leaders for tomorrow’s India.' },
    ],
    quote: 'Every child. Every right — because a learning child is a nation’s brightest hope.',
    // NOTE: placeholder sample numbers — replace with real figures before launch.
    metrics: [
      { v: '2,000+', l: 'Children Supported' },
      { v: '18', l: 'Schools Reached' },
      { v: '1,500+', l: 'Learning Kits Given' },
      { v: '₹6 L', l: 'Funds Raised' },
    ],
  },
  {
    id: 'global-events',
    name: 'Global Events',
    icon: '🌍',
    status: 'Past Initiative · Global',
    strap: 'Taking India to the World.',
    sub: 'Culture · Diplomacy · India to the World',
    blurb: 'Representing India’s culture and values on global platforms with embassies and diplomats.',
    intro: [
      "Global Events carries the soul of India to the world stage. In partnership with diplomats and embassies, we represent India’s culture, cuisine, art and values at international platforms — as cultural ambassadors for a proud and vibrant nation.",
      "From food and fabric to art and tradition, India’s story deserves a global audience. Through curated cultural events and diplomatic collaborations, we showcase that story — one celebration at a time.",
    ],
    highlights: [
      { big: 'India to the World', label: 'culture without borders' },
      { big: 'Embassy Partners', label: 'diplomatic collaborations' },
      { big: 'Ambassadors', label: 'the soul of India, abroad' },
    ],
    focus: [
      { title: 'Cultural Diplomacy', text: 'Partnering with embassies and diplomats to represent India abroad.' },
      { title: 'Art, Food & Heritage', text: 'Showcasing the colour, cuisine and craft of India.' },
      { title: 'India’s Values', text: 'Carrying the nation’s spirit and ethos to the world.' },
      { title: 'Cultural Ambassadors', text: 'Building bridges between India and the world, one event at a time.' },
    ],
    quote: 'Taking India to the world — showcasing the soul of India, one event at a time.',
    // NOTE: placeholder sample numbers — replace with real figures before launch.
    metrics: [
      { v: '25+', l: 'Events Hosted' },
      { v: '12', l: 'Embassy Partners' },
      { v: '15', l: 'Countries Reached' },
      { v: '10,000+', l: 'People Reached' },
    ],
  },
].map((p) => {
  const folder =
    p.id === 'green-period' ? 'Green Periods'
      : p.id === 'handloom' ? 'Handloom'
      : p.id === 'women-empowerment' ? 'Women Empowerment'
      : p.id === 'child-welfare' ? 'Child Welfare'
      : 'Global Events';
  return { ...p, images: folderImages(folder), logo: folderLogo(folder) };
});

const projects = [
  {
    id: 'akshar',
    name: 'Project Akshar',
    blurb: 'Educating children & empowering women in the border villages of Kashmir.',
    ongoing: true,
  },
  ...extraProjects.map((p) => ({ id: p.id, name: p.name, blurb: p.blurb })),
];

// Projects shown in the homepage carousel (with logos + status).
const carouselProjects = [
  {
    id: 'akshar',
    name: 'Project Akshar',
    logo: aksharLogo,
    status: 'Ongoing · Kashmir Valley',
    blurb: 'Educating children & empowering women in the border villages of Kashmir.',
    ongoing: true,
  },
  ...extraProjects.map((p) => ({
    id: p.id,
    name: p.name,
    logo: p.logo,
    status: p.status,
    blurb: p.blurb,
    ongoing: false,
  })),
];

// Core team / trustees. To add a member's photo, import it above and set `photo`.
// To add a bio, fill `bio` (3–4 lines). `initials` drives the placeholder monogram.
const team = [
  {
    name: 'Colonel DK Dass',
    role: 'Founder Trustee',
    photo: founderPhoto,
    initials: 'DKD',
    bio: "A retired Gunner (Artillery) Colonel of the Indian Army who served on the nation’s hardest frontiers — Siachen, the Line of Control and Kupwara. A Paul Harris Fellow and veteran Rotarian, he founded Indian Bravehearts to stand with the families of the armed-forces fraternity.",
  },
  {
    name: 'Sarah Rawat',
    role: 'Trustee & Secretary',
    photo: sarahPhoto,
    initials: 'SR',
    bio: "A defence officer’s wife and an MBA in marketing, Sarah is a motivational speaker (TEDx ×2) and a champion of women’s empowerment. She leads the trust’s work for war widows (Veer Naaris) and drives the Green Periods and Project Akshar initiatives.",
  },
  {
    name: 'Preeti Yadav',
    role: 'Member',
    photo: preetiPhoto,
    initials: 'PY',
    bio: "Founder of Queeniefied Events and the women’s community Swawlambani, State Director for Miss Universe (UP & Punjab) and a Sarojini Naidu Award honouree. A partner on Project Akshar, she brings her platform to the cause of education and women’s empowerment.",
  },
  {
    name: 'Himangi Arora',
    role: 'Member',
    photo: null,
    initials: 'HA',
    bio: null,
  },
];

const App = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);
  const [view, setView] = useState('home');
  const [lightbox, setLightbox] = useState(null);
  const videoRef = useRef(null);

  const currentProject = projects.find((p) => p.id === view);
  const genericProject = extraProjects.find((p) => p.id === view);
  const lbImages =
    view === 'akshar'
      ? aksharGallery
      : genericProject
        ? genericProject.images.map((src) => ({ src, cap: genericProject.name }))
        : [];

  const closeMenu = () => {
    setMenuOpen(false);
    setProjOpen(false);
  };

  const openProject = (id) => {
    setLightbox(null);
    setView(id);
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNav = (e, hash) => {
    e.preventDefault();
    closeMenu();
    setLightbox(null);
    const scroll = () => {
      if (hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (view !== 'home') {
      setView('home');
      setTimeout(scroll, 70);
    } else {
      scroll();
    }
  };

  const showPrev = () =>
    setLightbox((i) => (i - 1 + lbImages.length) % lbImages.length);
  const showNext = () => setLightbox((i) => (i + 1) % lbImages.length);

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

  // Re-run reveal observer whenever the view changes so freshly-mounted
  // sections animate in correctly.
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
  }, [view]);

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
  }, [view]);

  useEffect(() => {
    if (lightbox === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'ArrowLeft') showPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

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
            <a href="tel:+917011152339">+91 70111 52339</a>
            <a href="mailto:dilipkdass@gmail.com">dilipkdass@gmail.com</a>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#home" onClick={(e) => handleNav(e, '#home')}>
            <img className="brand-logo" src={logo} alt="Indian Bravehearts logo" />
            <span className="brand-text">
              <strong>INDIAN BRAVEHEARTS</strong>
              <span>Strong Alone, Stronger Together</span>
            </span>
          </a>
          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={menuOpen ? 'open' : ''}>
            <a href="#home" onClick={(e) => handleNav(e, '#home')}>Home</a>
            <a href="#about" onClick={(e) => handleNav(e, '#about')}>About</a>
            <a href="#founder" onClick={(e) => handleNav(e, '#founder')}>Founders</a>

            <div className={`nav-dropdown${projOpen ? ' open' : ''}`}>
              <button
                type="button"
                className="nav-dropbtn"
                aria-haspopup="true"
                aria-expanded={projOpen}
                onClick={() => setProjOpen((o) => !o)}
              >
                Projects <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div className="nav-menu">
                <span className="nav-menu-label">Our Projects</span>
                {projects.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className="nav-menu-item"
                    onClick={() => openProject(p.id)}
                  >
                    <span className="nm-title">
                      {p.ongoing && <span className="nm-dot" aria-hidden="true" />}
                      {p.name}
                    </span>
                    <span className="nm-sub">{p.blurb}</span>
                  </button>
                ))}
              </div>
            </div>

            <a href="#leadership" onClick={(e) => handleNav(e, '#leadership')}>Leadership</a>
            <a href="#help" onClick={(e) => handleNav(e, '#help')}>Help</a>
            <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>Contact</a>
            <a className="donate-button" href="#donate" onClick={(e) => handleNav(e, '#donate')}>Donate</a>
          </nav>
        </div>
      </header>

      {view === 'home' && (
        <>
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
              <button
                type="button"
                className="hero-live-chip"
                onClick={() => openProject('akshar')}
              >
                <span className="live-dot" aria-hidden="true" />
                Live · Project Akshar
                <span className="arrow" aria-hidden="true">→</span>
              </button>
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
                <a className="primary-button" href="#about" onClick={(e) => handleNav(e, '#about')}>Our Mission</a>
                <a className="secondary-button" href="#donate" onClick={(e) => handleNav(e, '#donate')}>Stand With Them</a>
              </div>
            </div>
          </section>

          {/* ─── Featured: Project Akshar (immediate attention) ───────────── */}
          <section className="featured-akshar animate">
            <div className="featured-inner">
              <div className="featured-emblem">
                <img src={aksharLogo} alt="Project Akshar logo" />
              </div>
              <div className="featured-body">
                <span className="featured-badge">
                  <span className="live-dot" aria-hidden="true" />
                  Live Now · Ongoing Mission
                </span>
                <h2>Project Akshar</h2>
                <p className="featured-strap">Lighting Up Futures in Kashmir</p>
                <p>
                  Right now, just kilometres from the Line of Control, we are equipping the classrooms
                  of Kashmir’s border villages — educating children and empowering women where it
                  matters most. This is our flagship mission, and it is happening today.
                </p>
                <div className="featured-actions">
                  <button type="button" className="donate-button" onClick={() => openProject('akshar')}>
                    Explore Project Akshar →
                  </button>
                  <a className="secondary-button" href="#donate" onClick={(e) => handleNav(e, '#donate')}>
                    Donate Now
                  </a>
                </div>
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
                <span className="founder-role">Founder Trustee</span>
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
                <span className="founder-role">Co-Founder · Trustee &amp; Secretary</span>
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

          {/* ─── Projects carousel ────────────────────────────────────────── */}
          <section className="section initiatives-section animate">
            <div className="section-header">
              <span className="dot"></span>
              <h2>Our Projects</h2>
            </div>
            <p>
              From the border villages of Kashmir to the world stage — explore the initiatives
              through which Indian Bravehearts serves the nation and its people.
            </p>
            <div className="carousel">
              <div className="carousel-track">
                {[...carouselProjects, ...carouselProjects].map((p, i) => (
                  <button
                    type="button"
                    key={`${p.id}-${i}`}
                    className="carousel-card"
                    onClick={() => openProject(p.id)}
                    aria-label={`View ${p.name}`}
                    aria-hidden={i >= carouselProjects.length}
                    tabIndex={i >= carouselProjects.length ? -1 : 0}
                  >
                    <div className="carousel-logo">
                      <img src={p.logo} alt={`${p.name} logo`} />
                    </div>
                    <span className={`carousel-status${p.ongoing ? ' ongoing' : ''}`}>{p.status}</span>
                    <h3>{p.name}</h3>
                    <p>{p.blurb}</p>
                    <span className="carousel-link">View Project →</span>
                  </button>
                ))}
              </div>
            </div>
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

          {/* ─── Our Team / Trustees ──────────────────────────────────────── */}
          <section id="leadership" className="section panel animate">
            <div className="section-header">
              <span className="dot"></span>
              <h2>Our Team</h2>
            </div>
            <p>
              Indian Bravehearts is guided by its trustees and office-bearers — veterans, professionals
              and changemakers who bring their experience and conviction to the cause.
            </p>
            <div className="team-grid">
              {team.map((m, i) => (
                <div
                  key={`${m.name}-${m.role}-${i}`}
                  className="team-card animate"
                  style={{ '--delay': `${i * 0.06}s` }}
                >
                  {m.photo ? (
                    <img className="team-photo" src={m.photo} alt={m.name} />
                  ) : (
                    <div className="team-photo-ph" aria-hidden="true">{m.initials}</div>
                  )}
                  <div className="team-info">
                    <p className={`team-name${m.pending ? ' pending' : ''}`}>{m.name}</p>
                    <p className="team-role">{m.role}</p>
                    <p className={`team-bio${m.bio ? '' : ' pending'}`}>
                      {m.bio || 'A short introduction will be added soon.'}
                    </p>
                  </div>
                </div>
              ))}
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
            <p><strong>Phone:</strong> +91 70111 52339</p>
            <p><strong>Alternate:</strong> +91 9810266662, +91 9810166662</p>
            <p><strong>Email:</strong> dilipkdass@gmail.com</p>
            <p><strong>Website:</strong> www.indianbravehearts.com</p>
            <p><strong>Facebook:</strong> /IndianBravehearts</p>
            <p><strong>Based in:</strong> New Delhi, India</p>
            <p>
              All donations are exempt from Income Tax under Sec. 80G of the Income Tax Act, 1961. Email
              us your payment details and address to receive an official exemption certificate.
            </p>
          </section>
        </>
      )}

      {view === 'akshar' && (
        <main className="project-page">
          <div className="project-breadcrumb">
            <a href="#home" onClick={(e) => handleNav(e, '#home')}>Home</a>
            <span aria-hidden="true">›</span>
            <span>Projects</span>
            <span aria-hidden="true">›</span>
            <span className="current">{currentProject.name}</span>
          </div>

          <article className="project-feature animate">
            <div className="project-hero">
              <img className="project-emblem" src={aksharLogo} alt="Project Akshar emblem" />
              <div className="project-hero-text">
                <span className="project-status">Ongoing · Kashmir Valley</span>
                <h3>Project Akshar</h3>
                <p className="project-strap">Lighting Up Futures in Kashmir</p>
                <p className="project-tagline">हर अक्षर · नई आशा · उज्ज्वल भारत</p>
                <p className="project-sub">
                  Educating Children · Empowering Women · Strengthening Communities · Building the Nation
                </p>
              </div>
            </div>

            <div className="project-body">
              <p>
                Project Akshar is a joint mission of <strong>Indian Bravehearts</strong>,
                <strong> Queeniefied Events</strong> and the <strong>Indian Army</strong>, led by our
                co-founder Sarah D. Rawat alongside Preeti Yadav. It began in a small village just five
                kilometres from the Line of Control, where we found classrooms that lacked the most
                basic essentials — desks, books and stationery — yet were filled with children rich in
                resilience and courage. Our aim is simple: to make their classrooms match their spirit.
              </p>
              <p>
                We have identified 11–12 primary and secondary schools across border villages, and
                distributed essential learning materials so that students can study with dignity and
                comfort. Talent exists everywhere; opportunity does not. Project Akshar exists to close
                that gap — one child, one woman, one village at a time.
              </p>

              <div className="project-partners">
                <span className="label">In partnership with</span>
                <span className="partner">Indian Bravehearts</span>
                <span className="sep">·</span>
                <span className="partner">Queeniefied Events</span>
                <span className="sep">·</span>
                <span className="partner">Indian Army</span>
              </div>

              <div className="project-facts">
                <div className="fact">
                  <b>5 km</b>
                  <span>from the Line of Control, where our journey began</span>
                </div>
                <div className="fact">
                  <b>11–12</b>
                  <span>border-village schools identified for support</span>
                </div>
                <div className="fact">
                  <b>100%</b>
                  <span>of contributions go directly to school supplies</span>
                </div>
              </div>

              <div className="why-block">
                <h4>Why Project Akshar</h4>
                <p>
                  What we witnessed in a village near the Line of Control is not unique. The same gap —
                  between talent and opportunity — exists across villages, small towns, tribal regions
                  and border areas throughout India. Children there dream of becoming teachers, doctors,
                  scientists, soldiers and leaders; women aspire to be skilled, independent and
                  confident. All they need is a chance.
                </p>
                <p>
                  That is why Akshar is more than a distribution drive — it is a
                  <strong> nation-building movement</strong>. Education creates direction; empowerment
                  creates transformation. When a child learns, they build a better future; when a woman
                  becomes self-reliant, an entire family rises with her. The impact multiplies.
                </p>
              </div>

              <div className="project-pillars">
                <div className="pillar">
                  <h4>Education for Every Child</h4>
                  <ul>
                    <li>Educational support and learning resources</li>
                    <li>School engagement and motivation programmes</li>
                    <li>Career awareness and mentorship</li>
                    <li>Digital learning opportunities</li>
                    <li>Leadership and life-skills development</li>
                  </ul>
                </div>
                <div className="pillar">
                  <h4>Empowering Women</h4>
                  <ul>
                    <li>Skill development and training</li>
                    <li>Entrepreneurship support</li>
                    <li>Financial and digital literacy</li>
                    <li>Sustainable livelihood opportunities</li>
                    <li>Leadership development</li>
                  </ul>
                </div>
              </div>

              <div className="impact-ripple">
                <div className="ripple">
                  <span className="from">Educate one child</span>
                  <span className="arrow" aria-hidden="true">↓</span>
                  <span className="to">Impact one future</span>
                </div>
                <div className="ripple">
                  <span className="from">Empower one woman</span>
                  <span className="arrow" aria-hidden="true">↓</span>
                  <span className="to">Impact one family</span>
                </div>
                <div className="ripple">
                  <span className="from">Strengthen one community</span>
                  <span className="arrow" aria-hidden="true">↓</span>
                  <span className="to">Transform generations</span>
                </div>
              </div>

              <div className="vision-band">
                <h4>Vision <span>2030</span> — our goals</h4>
                <div className="vision-grid">
                  <div className="vision-item">
                    <b>1 Million</b>
                    <span>Children Impacted</span>
                  </div>
                  <div className="vision-item">
                    <b>100,000</b>
                    <span>Women Empowered</span>
                  </div>
                  <div className="vision-item">
                    <b>Thousands</b>
                    <span>of Communities Strengthened</span>
                  </div>
                  <div className="vision-item">
                    <b>Countless</b>
                    <span>Future-Ready Citizens</span>
                  </div>
                </div>
              </div>

              {/* NOTE: placeholder sample numbers — replace with real figures before launch. */}
              <div className="vision-band metrics-band">
                <h4>Impact in <span>Numbers</span></h4>
                <div className="metrics-grid">
                  <div className="vision-item"><b>₹8.5 L</b><span>Funds Raised</span></div>
                  <div className="vision-item"><b>1,200+</b><span>Children Reached</span></div>
                  <div className="vision-item"><b>12</b><span>Schools Supported</span></div>
                  <div className="vision-item"><b>40+</b><span>Volunteers Engaged</span></div>
                </div>
              </div>

              <h4 className="gallery-title">From the Ground</h4>
              <div className="project-gallery">
                {aksharGallery.map((img, i) => (
                  <button
                    type="button"
                    key={img.src}
                    className="gallery-item"
                    onClick={() => setLightbox(i)}
                    aria-label={`View photo: ${img.cap}`}
                  >
                    <img src={img.src} alt={img.cap} loading="lazy" />
                    <span className="gallery-cap">{img.cap}</span>
                  </button>
                ))}
              </div>

              <blockquote className="akshar-quote">
                <p>
                  “Your future matters. Your dreams matter.
                  <span className="gold"> And India stands with you.”</span>
                </p>
              </blockquote>

              <h4 className="leads-title">Mission Leads</h4>
              <div className="mission-leads">
                <div className="lead-card">
                  <img src={sarahPhoto} alt="Sarah D. Rawat" />
                  <div className="lead-info">
                    <h4>Sarah D. Rawat</h4>
                    <p className="lead-role">Co-Founder, Indian Bravehearts · Project Lead</p>
                    <p>
                      An officer's wife, motivational speaker and champion of women's empowerment, Sarah
                      drives Akshar's work for the children and women of the valley.
                    </p>
                  </div>
                </div>
                <div className="lead-card">
                  <img src={preetiPhoto} alt="Preeti Yadav" />
                  <div className="lead-info">
                    <h4>Preeti Yadav</h4>
                    <p className="lead-role">Founder, Queeniefied Events · Project Partner</p>
                    <p>
                      Entrepreneur and founder of the women's community Swawlambani, State Director for
                      Miss Universe (UP &amp; Punjab) and a Sarojini Naidu Award honouree, Preeti brings
                      her platform to the cause.
                    </p>
                  </div>
                </div>
              </div>

              <div className="csr-box">
                <div className="csr-head">
                  <h4>CSR Partnership Opportunity</h4>
                  <span className="csr-total">₹2 Crore</span>
                </div>
                <ul className="csr-list">
                  <li><span>Educational infrastructure — desks, furniture, library corners</span><span className="amt">₹80 L</span></li>
                  <li><span>Student education kits — bags, notebooks, stationery</span><span className="amt">₹40 L</span></li>
                  <li><span>Women empowerment programmes</span><span className="amt">₹30 L</span></li>
                  <li><span>School adoption &amp; community programmes</span><span className="amt">₹20 L</span></li>
                  <li><span>Logistics &amp; project execution</span><span className="amt">₹20 L</span></li>
                  <li><span>Monitoring, documentation &amp; impact reporting</span><span className="amt">₹10 L</span></li>
                </ul>
                <p className="csr-foot">
                  <strong>Funding focus:</strong> Corporate CSR partnerships · NRI contributions · NGO
                  fundraising platforms. Partners receive impact reports, documentation and CSR
                  visibility.
                </p>
              </div>

              <div className="project-cta">
                <a className="primary-button" href="#donate" onClick={(e) => handleNav(e, '#donate')}>Donate to Akshar</a>
                <a className="outline-button" href="#contact" onClick={(e) => handleNav(e, '#contact')}>Corporate Connect</a>
              </div>
            </div>
          </article>
        </main>
      )}

      {genericProject && (
        <main className="project-page">
          <div className="project-breadcrumb">
            <a href="#home" onClick={(e) => handleNav(e, '#home')}>Home</a>
            <span aria-hidden="true">›</span>
            <span>Projects</span>
            <span aria-hidden="true">›</span>
            <span className="current">{genericProject.name}</span>
          </div>

          <article className="project-feature animate">
            <div className="project-hero">
              {genericProject.logo ? (
                <img className="project-emblem" src={genericProject.logo} alt={`${genericProject.name} logo`} />
              ) : (
                <div className="project-badge" aria-hidden="true">{genericProject.icon}</div>
              )}
              <div className="project-hero-text">
                <span className={`project-status${genericProject.ongoing ? '' : ' past'}`}>{genericProject.status}</span>
                <h3>{genericProject.name}</h3>
                <p className="project-strap">{genericProject.strap}</p>
                {genericProject.sub && <p className="project-sub">{genericProject.sub}</p>}
              </div>
            </div>

            <div className="project-body">
              {genericProject.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {genericProject.partner && (
                <div className="project-partners">
                  <span className="label">In collaboration with</span>
                  <span className="partner">{genericProject.partner.label}</span>
                  <span className="sep">·</span>
                  <span>{genericProject.partner.note}</span>
                </div>
              )}

              <div className="project-facts">
                {genericProject.highlights.map((h) => (
                  <div className="fact" key={h.big}>
                    <b>{h.big}</b>
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>

              <h4 className="gallery-title">Our Focus</h4>
              <div className="project-pillars focus-grid">
                {genericProject.focus.map((f) => (
                  <div className="pillar" key={f.title}>
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>

              {genericProject.metrics && (
                <div className="vision-band metrics-band">
                  <h4>Impact in <span>Numbers</span></h4>
                  <div className="metrics-grid">
                    {genericProject.metrics.map((m) => (
                      <div className="vision-item" key={m.l}>
                        <b>{m.v}</b>
                        <span>{m.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <blockquote className="akshar-quote">
                <p>{genericProject.quote}</p>
              </blockquote>

              {genericProject.images.length > 0 && (
                <>
                  <h4 className="gallery-title">From the Ground</h4>
                  <div className="project-gallery">
                    {genericProject.images.map((src, i) => (
                      <button
                        type="button"
                        key={src}
                        className="gallery-item"
                        onClick={() => setLightbox(i)}
                        aria-label={`View photo from ${genericProject.name}`}
                      >
                        <img src={src} alt={`${genericProject.name} — photo ${i + 1}`} loading="lazy" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="project-cta">
                <a className="primary-button" href="#donate" onClick={(e) => handleNav(e, '#donate')}>Support {genericProject.name}</a>
                <a className="outline-button" href="#contact" onClick={(e) => handleNav(e, '#contact')}>Get Involved</a>
              </div>
            </div>
          </article>
        </main>
      )}

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav prev"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={lbImages[lightbox].src} alt={lbImages[lightbox].cap} />
            <figcaption>{lbImages[lightbox].cap}</figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav next"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}

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
            <p>+91 70111 52339</p>
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
            <a href="#about" onClick={(e) => handleNav(e, '#about')}>Who We Are</a>
            <a href="#founder" onClick={(e) => handleNav(e, '#founder')}>The Founders</a>
            <button type="button" className="footer-link-btn" onClick={() => openProject('akshar')}>Project Akshar</button>
            <a href="#help" onClick={(e) => handleNav(e, '#help')}>How You Can Help</a>
            <a href="#donate" onClick={(e) => handleNav(e, '#donate')}>Donate</a>
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
