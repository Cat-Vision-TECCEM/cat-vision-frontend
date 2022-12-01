import Link from "next/link";
import { useState, useEffect } from "react";

function NewProviderCard() {
  const [providers, setProviders] = useState<any>();
  const providersLogo = [
    {
      src: "https://d2q79iu7y748jz.cloudfront.net/s/_logo/ca177b9b49bbdff59d88a893de46c6a3",
      alt: "company name",
    },
    {
      src: "https://1000marcas.net/wp-content/uploads/2020/10/PepsiCo-logo.jpg",
      alt: "company name",
    },
    {
      src: "https://d2q79iu7y748jz.cloudfront.net/s/_logo/ca177b9b49bbdff59d88a893de46c6a3",
      alt: "company name",
    },
    {
      src: "https://1000marcas.net/wp-content/uploads/2020/10/PepsiCo-logo.jpg",
      alt: "company name",
    },
    {
      src: "https://d2q79iu7y748jz.cloudfront.net/s/_logo/ca177b9b49bbdff59d88a893de46c6a3",
      alt: "company name",
    },
    {
      src: "https://1000marcas.net/wp-content/uploads/2020/10/PepsiCo-logo.jpg",
      alt: "company name",
    },
  ];

  const getData = async () => {
    const providerData = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}company/get-companies`
    );
    const providerDataJSON = await providerData.json();
  };

  useEffect(() => {
    getData();
  }, []);

  const providerCard = providersLogo.map((provider, index) => (
    <div className="provider-card" key={index}>
      <img className="provider-logo" src={provider.src} alt={provider.alt} />

      <input type="submit" value="Realizar Pedido"></input>
      <Link href="/grocery_stores/products_list">Hola</Link>
    </div>
  ));
  return <div className="provider-card-container">{providerCard}</div>;
}

export default NewProviderCard;
