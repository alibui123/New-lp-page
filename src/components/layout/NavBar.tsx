export function NavBar() {
  return (
    <nav id="topnav">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%', padding: '0 2vw' }}>
        <a className="nav-brand" href="#ch0" aria-label="Finova Solutions home">
          <img className="nav-brand-logo" src="/assets/finova-icon.png" alt="Finova Solutions logo" decoding="async" />
          <span className="sr-only">Finova Solutions</span>
        </a>
        <div className="nav-links">
          <a href="#ch1">Problem</a>
          <a href="#ch2">Solution</a>
          <a href="#ch3">How It Works</a>
          <a href="#ch4">Results</a>
          <a href="#ch5">Team</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="https://calendly.com/mutaal-finovasolutions/new-meeting" target="_blank" rel="noopener noreferrer">
          Book Call
        </a>
      </div>
    </nav>
  );
}
