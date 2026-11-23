import { useState } from "react";

const Arrow = ({ diagonal = false }) => <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;

function Logo({ light = false }) {
  return <a className={`logo${light ? " logo-light" : ""}`} href="#top" aria-label="PostPilot home"><span className="logo-mark">✳</span> PostPilot</a>;
}

function LeadForm({ light = false, compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus(data.message);
      setEmail("");
    } catch (error) {
      setStatus(error.message || "We couldn't connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`lead-wrap${light ? " lead-wrap-light" : ""}${compact ? " lead-wrap-compact" : ""}`}>
      <form className="lead-form" onSubmit={submit}>
        <label className="visually-hidden" htmlFor={compact ? "footer-email" : "hero-email"}>Work email</label>
        <input id={compact ? "footer-email" : "hero-email"} type="email" placeholder="Your work email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button className={`button${light ? " button-white" : ""}`} type="submit" disabled={busy}>{busy ? "Sending..." : "Get started"} <Arrow /></button>
      </form>
      <p className="form-note" aria-live="polite">{status || "No contracts. No awkward sales calls. Just good mail."}</p>
    </div>
  );
}

function PostcardArtwork({ variant = "hero" }) {
  const artwork = {
    hero: { src: "/artwork/postcard-flatlay.svg", alt: "Illustrated direct mail postcards layered on a cream background" },
    stack: { src: "/artwork/postcard-duo.svg", alt: "Pink and turquoise promotional postcards with playful product illustrations" },
    cta: { src: "/artwork/postcard-hand.svg", alt: "A hand holding two colorful direct mail postcards" }
  }[variant];

  return (
    <div className={`postcard-art postcard-art-${variant}`}>
      <img className="postcard-art-image" src={artwork.src} alt={artwork.alt} />
    </div>
  );
}

const brands = ["RUN GUM", "BEARBRAND", "PROMIX", "BOMBAS"];
const features = [
  { image: "/artwork/feature-integrations.png", alt: "Klaviyo and Shopify integration marks", title: "Plug-and-play with your stack", text: "Native integrations provide seamless segmentation, automation & tracking. No clunky spreadsheets.", color: "peach" },
  { image: "/artwork/feature-campaign-dashboard.png", alt: "Abandoned cart campaign dashboard preview", title: "Run campaigns on autopilot", text: "Ink profits while you sleep: just set it and forget it.", color: "mint" },
  { image: "/artwork/feature-analytics-dashboard.png", alt: "Postcard campaign metrics with a line chart and bar chart", title: "Real-time ROI dashboard", text: "Track every postcard by customer or discount code. Your CFO will love it.", color: "lilac" },
  { image: "/artwork/feature-handwritten-card.png", alt: "Handwritten thank-you card", title: <>Deliver WOW with *real* handwritten cards</>, text: "Our proprietary robots use real pens and ink for an unforgettable VIP touch.", color: "blue" },
  { image: "/artwork/feature-stamp-postcard.png", alt: "Postcard with a commemorative stamp and postmark", title: "Predictable pricing", text: "Unlike CPCs, postage rates don’t change based on competition or who you’re targeting.", color: "pink" },
  { image: "/artwork/feature-concierge.png", alt: "Concierge service steps: design, strategy, implementation", title: "Complimentary concierge service", text: "Our pros build your strategy and custom designs using battle-tested best practices.", color: "sand" }
];
const reviews = [
  { name: "Kara Goldin", role: "Founder, Hint", quote: "PostPilot gives us a way to show up in our customers’ homes in a way that feels personal and memorable." },
  { name: "Matt Mullenax", role: "CEO, Huron", quote: "We’ve found a new way to reach customers that actually feels like us. The results speak for themselves." },
  { name: "Taylor Holiday", role: "CEO, Common Thread", quote: "It’s one of the most effective, easiest-to-use channels in our growth mix. We’re big fans." }
];
const articles = [
  { tag: "DIRECT MAIL", title: "3 low-cost campaigns you must run for BFCM", image: "article-bfcm", alt: "A postcard campaign laid out on a desk" },
  { tag: "GROWTH", title: "Postcard marketing: the definitive guide to doing it right", image: "article-guide", alt: "A postcard design with colorful campaign graphics" },
  { tag: "PLAYBOOK", title: "The ultimate guide to thank-you notes for ecommerce", image: "article-thanks", alt: "A bright thank-you postcard with a handwritten note" }
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? "×" : "☰"}</button>
        <nav className={open ? "nav nav-open" : "nav"} aria-label="Main navigation">
          <a href="#how">How it works</a><a href="#features">Why PostPilot</a><a href="#stories">Case studies</a><a href="#resources">Resources</a>
        </nav>
        <div className="header-actions"><a className="login-link" href="#footer">Log in</a><a className="button button-small" href="#get-started">Get a demo <Arrow /></a></div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> DIRECT MAIL, MEET YOUR NEXT ERA</div>
          <h1>Meet your<br /><span className="script">favorite</span> new (old)<br />marketing channel.</h1>
          <p>Make direct mail your unfair advantage. PostPilot makes it ridiculously easy to turn your best customers into your biggest fans.</p>
          <LeadForm />
          <div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><div><span className="stars">★★★★★</span><small>Loved by 1,000+ ambitious brands</small></div></div>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
          <PostcardArtwork />
          <div className="metric-float"><span className="metric-top">CAMPAIGN REVENUE</span><strong>$234,597</strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div><small>↗ 28.4% this month</small></div>
          <div className="mail-float"><span>✉</span><div><b>Your next great idea</b><small>is already in the mail.</small></div></div>
          <span className="hero-doodle">good mail<br />feels good!</span>
        </div>
      </div>
      <div className="hero-bottom container"><span>THE DIRECT MAIL PLATFORM FOR</span><span className="bottom-arrow">↓</span><span>GROWING BRANDS WITH GOOD TASTE</span></div>
    </section>
  );
}

function Trust() {
  return <section className="trust section-pad"><div className="container"><p className="eyebrow centered">IN VERY GOOD COMPANY</p><h2>Trusted by thousands<br />of top DTC <span className="script">brands.</span></h2><div className="brand-row">{brands.map((brand, i) => <div className={`brand brand-${i}`} key={brand}><span className="brand-icon">{["◉", "▣", "✦", "◒"][i]}</span>{brand}</div>)}</div></div></section>;
}

function Stats() {
  return <section className="stats-section section-pad"><div className="container"><p className="eyebrow centered">A LITTLE SOMETHING THAT GOES A LONG WAY</p><h2>Why use direct mail?<br />It <span className="script">works</span> like crazy.</h2><div className="stats-row"><div className="stat"><strong>28<span>×</span></strong><p>higher response rates<br />than digital channels</p></div><div className="stat-center"><div className="mail-icon">✉</div><span>THE MAILBOX<br />IS HAVING A MOMENT</span></div><div className="stat"><strong>17 <span className="unit">Days</span></strong><p>of brand visibility<br />with every postcard</p></div></div></div></section>;
}

function PainPoints() {
  const items = [
    { title: <><span className="script">Powerful</span> acquisition<br />& retention</>, text: "Send the right message to the right customer at the right moment. That’s a pretty great way to build a fan." , quote: "The easiest way we've found to keep our best customers coming back." },
    { title: <><span className="script">Fight back</span> against iOS<br />updates, jacked-up<br />CPCs & spam folders</>, text: "Your message never gets lost in a feed, skipped in a story, or filtered into the junk folder.", quote: "Mail is the one channel that always makes it to the front door." },
    { title: <>Done for <span className="script">you.</span></>, text: "From first design to stamps on the doorstep, we make direct mail ridiculously easy to launch and scale.", quote: "It feels like having a direct mail team built right into our business." }
  ];
  return <section className="pain-section section-pad"><div className="container"><div className="pain-intro"><span className="eyebrow">OLD-SCHOOL CHANNEL. NEW-SCHOOL SMARTS.</span><h2>PostPilot makes it a <span className="script">cinch</span> to<br />send personalized, profit-<br className="desktop-break" />generating postcards.</h2></div><div className="pain-list">{items.map((item, i) => <article className={`pain-item pain-${i}`} key={i}><span className="pain-number">0{i + 1} / 03</span><div><h3>{item.title}</h3><p>{item.text}</p><blockquote><span>“</span>{item.quote}<small>— A happy PostPilot customer</small></blockquote></div><span className="pain-stamp">{["↗", "✳", "♡"][i]}</span></article>)}</div><a className="button" href="#get-started">Let’s make it happen <Arrow /></a></div></section>;
}

function Features() {
  return <section className="features section-pad" id="features"><div className="container"><p className="eyebrow centered">A WHOLE LOT OF GOOD, BUILT IN</p><h2>Everything your brand needs to<br /><span className="script">make your brand unforgettable</span></h2><div className="feature-grid">{features.map((feature, index) => <article className={`feature-card ${feature.color}`} key={index}><img className="feature-art" src={feature.image} alt={feature.alt} /><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></div></section>;
}

function HowItWorks() {
  const steps = [
    { number: "01", name: "Segment", text: "Find the right people with smart, simple targeting." },
    { number: "02", name: "Design", text: "Make every piece feel like it came from you." },
    { number: "03", name: "Send", text: "We print, stamp, and deliver it right to their door." },
    { number: "04", name: "Convert", text: "Watch your mail turn into measurable growth." }
  ];
  return <section className="how-section section-pad" id="how"><div className="container how-grid"><div className="how-copy"><p className="eyebrow">THE GOOD-MAIL FORMULA</p><h2>Fast launch.<br />Fast results.</h2><p className="script how-script">Here’s how.</p><div className="steps">{steps.map((step) => <div className="step" key={step.number}><span>{step.number}</span><div><h3>{step.name}</h3><p>{step.text}</p></div></div>)}</div></div><div className="how-visual"><div className="orbit-label label-top">THOUGHTFUL BY DESIGN</div><PostcardArtwork variant="stack" /><div className="orbit-label label-bottom">MADE TO MAKE AN IMPACT ↗</div><div className="how-stamp">GOOD<br />THINGS<br /><span>INSIDE</span></div></div></div></section>;
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const current = reviews[active];
  return <section className="reviews section-pad" id="stories"><div className="container"><p className="eyebrow centered">DON’T JUST TAKE OUR WORD FOR IT</p><h2>PostPilot is <span className="fire">✹</span> for <span className="script">real.</span></h2><div className="review-carousel"><button className="carousel-arrow" aria-label="Previous testimonial" onClick={() => setActive((active + reviews.length - 1) % reviews.length)}>←</button><article className="review-card"><div className="review-top"><span className="review-stars">★★★★★</span><span>✳ POSTPILOT CUSTOMER</span></div><p>“{current.quote}”</p><div className="review-author"><span className="review-avatar">{current.name.charAt(0)}</span><div><b>{current.name}</b><small>{current.role}</small></div><span className="review-mark">“</span></div></article><button className="carousel-arrow" aria-label="Next testimonial" onClick={() => setActive((active + 1) % reviews.length)}>→</button></div><div className="carousel-dots">{reviews.map((review, i) => <button key={review.name} aria-label={`Show testimonial ${i + 1}`} className={active === i ? "active" : ""} onClick={() => setActive(i)} />)}</div><a className="button button-outline" href="#get-started">See what’s possible <Arrow /></a></div></section>;
}

function CaseStudy() {
  return <section className="case-section section-pad"><div className="container case-grid"><div className="case-art"><img className="case-art-image" src="/artwork/postcard-duo.svg" alt="Two colorful direct mail postcards, one pink and one turquoise" /><span className="case-confetti confetti-a">✳</span><span className="case-confetti confetti-b">✦</span></div><div className="case-copy"><p className="eyebrow">A LITTLE MAIL. A LOT OF MAGIC.</p><h2>How <span className="script">Huron</span> drove<br />profits with hands-<br />off postcard campaigns</h2><p>See how a thoughtful, automated direct mail program helped Huron find the right people and turn more first orders into lifelong customers.</p><div className="case-metrics"><div><strong>14.68<span>%</span></strong><small>RESPONSE RATE</small></div><div><strong>8.59<span>×</span></strong><small>RETURN ON MAIL</small></div><div><strong>$73,457</strong><small>REVENUE DRIVEN</small></div></div><a className="button button-dark" href="#resources">Read the story <Arrow diagonal /></a><div className="case-logos"><span>HURON</span><span>✳ POSTPILOT</span><span>DTC GROWTH</span></div></div></div></section>;
}

function CTA() {
  return <section className="cta-section" id="get-started"><div className="container cta-grid"><div className="cta-copy"><p className="eyebrow">GOOD MAIL. NO GUESSWORK.</p><h2>Try PostPilot<br /><span>risk-free.</span></h2><p>We’ll help you create your first campaign. If it doesn’t work, we’ll make it right.</p><a className="button button-white" href="mailto:hello@postpilot.com">Let’s get started <Arrow /></a><div className="cta-rating"><span className="stars">★★★★★</span><small>4.9/5 from brands who get it</small></div></div><div className="cta-visual"><PostcardArtwork variant="cta" /><span className="cta-scribble">you’ve got<br />good mail!</span></div></div></section>;
}

function Resources() {
  return <section className="resources section-pad" id="resources"><div className="container"><div className="resources-heading"><div><p className="eyebrow">THE MAIL ROOM</p><h2>Latest trends & <span className="script">insights</span></h2></div><a className="text-link" href="#footer">Explore all resources <Arrow /></a></div><div className="article-grid">{articles.map((article, i) => <a className="article-card" href="#footer" key={article.title}><div className="article-image"><img src={`/artwork/${article.image}.svg`} alt={article.alt} /></div><p className="article-tag">{article.tag} <span>· {4 + i * 2} MIN READ</span></p><h3>{article.title}</h3><span className="article-link">Read the article <Arrow diagonal /></span></a>)}</div></div></section>;
}

function Footer() {
  return <footer className="site-footer" id="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Logo /><p>A little more human.<br />A lot more memorable.</p><div className="social-links"><a href="#footer" aria-label="Instagram">ig</a><a href="#footer" aria-label="LinkedIn">in</a><a href="#footer" aria-label="X">x</a></div></div><div className="footer-col"><h3>EXPLORE</h3><a href="#how">How it works</a><a href="#features">Why PostPilot</a><a href="#stories">Case studies</a><a href="#resources">Resources</a></div><div className="footer-col"><h3>THE DETAILS</h3><a href="#footer">Pricing</a><a href="#footer">Integrations</a><a href="#footer">FAQs</a><a href="#footer">Contact us</a></div><div className="footer-newsletter"><h3>A GOOD NOTE FROM US</h3><p>Get smart ideas for making your customers feel like your customers.</p><LeadForm compact /></div></div><div className="footer-bottom"><Logo /><span>© 2025 PostPilot, Inc. Made for brands with heart.</span><div><a href="#footer">Privacy</a><a href="#footer">Terms</a><span>Made with ✳ and a little mail magic.</span></div></div></div></footer>;
}

export default function App() {
  return <><Header /><main><Hero /><Trust /><Stats /><PainPoints /><Features /><HowItWorks /><Testimonials /><CaseStudy /><CTA /><Resources /></main><Footer /></>;
}
