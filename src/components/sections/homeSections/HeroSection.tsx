import { Link } from 'react-router';

export default function HeroSection() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="container mx-auto px-4 2xl:px-20">
                <div className="content">
                    <h2>Untapped Potential</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, diam nonummy
                        nibhie euismod vivamus at mauris.
                    </p>
                    <div className="flex items-center gap-2">
                        <Link to="#">Read More</Link>
                        <Link to="#">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
