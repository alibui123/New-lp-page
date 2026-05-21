type NavBarProps = {
  currentPage?: 'home' | 'offer' | 'terms';
};

export function NavBar({ currentPage = 'home' }: NavBarProps) {
  const prefix = currentPage === 'home' ? '' : '/';

  return (
    <nav id="topnav">
      <div className="nav-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingInline: '14px' }}>
        <a className="nav-brand" href={currentPage === 'home' ? '#ch0' : '/'} aria-label="Finova Solutions home">
          <img className="nav-brand-logo" src="/assets/finova-icon.png" alt="Finova Solutions logo" decoding="async" />
          <span className="sr-only">Finova Solutions</span>
        </a>
        <div className="nav-links">
          <a href={`${prefix}#ch1`}>Problem</a>
          <a href={`${prefix}#ch2`}>Solution</a>
          <a href={`${prefix}#ch3`}>How It Works</a>
          <a href={`${prefix}#ch4`}>Results</a>
          <a href={`${prefix}#ch5`}>Team</a>
          <a href={`${prefix}#demo`}>Live demo</a>
          <a href="/offer" aria-current={currentPage === 'offer' ? 'page' : undefined}>
            Offer
          </a>
          <a href={`${prefix}#contact`}>Contact</a>
        </div>
        <a className="nav-cta" href="https://calendly.com/mutaal-finovasolutions/new-meeting" target="_blank" rel="noopener noreferrer">
          Book Call
        </a>
      </div>
    </nav>
  );
}
