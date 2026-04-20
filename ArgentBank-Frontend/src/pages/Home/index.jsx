import "./index.css"
import FeatureCard from "../../components/FeatureCard"

export default function Home() {

    const cardData = [
        {
            title: "You are our #1 priority",
            description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
            imgSrc: "/src/assets/icon-chat.webp",
            imgAlt: "Chat icon",
        },
        {
            title: "More savings means higher rates",
            description: "The more you save with us, the higher your interest rate will be!",
            imgSrc: "/src/assets/icon-money.webp",
            imgAlt: "Money icon",
        },
        {
            title: "Security you can trust",
            description: "We use top of the line encryption to make sure your data and money is always safe.",
            imgSrc: "/src/assets/icon-security.png",
            imgAlt: "Security icon",
        },
    ]
    
    const cards = cardData.map((item, index) => 
        <FeatureCard
            key={`${item.title}-${index}`}
            title={item.title}
            description={item.description}
            imgSrc={item.imgSrc}
            imgAlt={item.imgAlt}
        />
    )

    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {cards}
            </section>
        </main>
    )
}