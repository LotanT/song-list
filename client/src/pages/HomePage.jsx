import { Link } from 'react-router-dom';

export function HomePage() {
    return (
    <section className="homepage">
      <div className="center">
        <div className='welcome'>Welcome to List Songs</div>
        <Link to="/songlist" className='start'>Let's Start</Link>
      </div>
    </section>
  );
}
