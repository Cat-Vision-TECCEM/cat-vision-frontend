function NewProviderCard() {
    const providersLogo = [
        {
            src: "https://d2q79iu7y748jz.cloudfront.net/s/_logo/ca177b9b49bbdff59d88a893de46c6a3",
            alt: "company name"
        },
        {
            src: "https://1000marcas.net/wp-content/uploads/2020/10/PepsiCo-logo.jpg",
            alt: "company name"
        },
        {
            src: "https://d2q79iu7y748jz.cloudfront.net/s/_logo/ca177b9b49bbdff59d88a893de46c6a3",
            alt: "company name"
        },
        {
            src: "https://1000marcas.net/wp-content/uploads/2020/10/PepsiCo-logo.jpg",
            alt: "company name"
        },
        {
            src: "https://d2q79iu7y748jz.cloudfront.net/s/_logo/ca177b9b49bbdff59d88a893de46c6a3",
            alt: "company name"
        },
        {
            src: "https://1000marcas.net/wp-content/uploads/2020/10/PepsiCo-logo.jpg",
            alt: "company name"
        }
       
    ]

    const providerCard = providersLogo.map((props) => (
        <div className="provider-card">
            <img className="provider-logo"
            src={props.src}
            alt={props.alt}
            />
            
            <input type="submit" value="Realizar Pedido"></input>
        </div>
    ))
    return(
        <div className="provider-card-container">
            {providerCard}
        </div>
    )}

    
        

export default NewProviderCard;