import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function NewProviderCard() {
  const router = useRouter();
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
      src: "https://www.sucosorder.com/media/images/org/grupo-modelo-logo-9EA22ADD7F-seeklogocom.png",
      alt: "company name",
    },
  ];

  const getData = async () => {
    const providerData = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}company/get-companies`
    );
    const providerDataJSON = await providerData.json();
  };

  const changePage = (e: any) => {
    e.preventDefault();
    router.push("/grocery_stores/products_list");
  };

  useEffect(() => {
    getData();
  }, []);

  const providerCard = providersLogo.map((provider, index) => (
    <div className="provider-card" key={index}>
      <img className="provider-logo" src={provider.src} alt={provider.alt} />

      <input type="submit" value="Realizar Pedido" onClick={changePage}></input>
    </div>
  ));
  return <div className="provider-card-container">{providerCard}</div>;
}

export default NewProviderCard;
