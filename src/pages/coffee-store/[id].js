import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/coffee-store.module.css";
import homeStyles from "@/styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import useStoreDataFromAirtable from "@/hooks/swr";

import { StoreContext } from "@/store/store-context";
import PageLoader from "@/components/pageLoader";
import ErrorPage from "@/components/errorPage";
import {
  fetchCoffeeStores,
  fixFrenchSpecialFont,
  getCoffeeStoreTips,
  isEmpty,
  upsertStoreData,
  upvoteCoffeeStore,
  upvoteFoundIn
} from "@/services/services.index";


export async function getStaticProps({params}) {
  const storesData = await fetchCoffeeStores();
  const storesTips = await getCoffeeStoreTips(params.id, 1)
  const findCoffeeStoreById = storesData.find(store => {
    return store.id === params.id; // dynamic id, and return the 1st storeData with the Id matching the static path params id.
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
      coffeeStoreTips: storesTips ? storesTips : "No info tips available",
    }, 
  }
};

export async function getStaticPaths() {
  const storesData = await fetchCoffeeStores();
  const paths = storesData.map(store => {
    return {
      params: {
        id: store.id
      }
    }
  });
  return {
    paths,   //shorthand
    fallback: true, // can also be false or 'blocking' 
  }
};

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
    
  const [storeData, setStoreData] = useState({});
  const [votingCount, setVotingCount] = useState(0);
  const { state: {coffeeStores} } = useContext(StoreContext);
    
  // import custom hooks using SWR to revalidate voting state
  const { data, isLoading, isError } = useStoreDataFromAirtable(id);
  
  // if no coffeeStores found from Staticprops than find it in Context
  useEffect(()=> {
    if(!initialProps.coffeeStore) {
      return;
    }
    if(isEmpty(initialProps.coffeeStore)) {
      if(coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find(store => store.id === id);
        if(coffeeStoreFromContext) {
          setStoreData(coffeeStoreFromContext)
          upsertStoreData(coffeeStoreFromContext)
        }
      } 
    } else {
      // also store Static Site Generation coffeeStore to persist voting.
      setStoreData(initialProps.coffeeStore)
      upsertStoreData(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);
  
  
  useEffect(()=> {
    if(data && data.length !== 0) {
      if(!data[0].errorMessage) {
        setStoreData(data[0])
      }
    }
    if(data && upvoteFoundIn(data)) {
      setVotingCount(data[0].voting)
    }
  }, [data]);


  async function handleUpvoteButton(){
    const result = await upvoteCoffeeStore(id);
    if(result) {
      setVotingCount(result.newUpvoteCount) 
    }
  }

  if(router.isFallback || isLoading) {
    return <PageLoader />
  }
  if(isError) {
    return <ErrorPage />
  }

  const {
    name, 
    address, 
    crossStreet,
    postcode,
    city,
    country,
    imgUrl
  } = storeData;
    
  return (
    <div className={styles.layout} >
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1} >
          <Link href="/" className={styles.backToHomeLink}>
          ← Back to home 
          </Link>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image 
            src={imgUrl || "/static/unsplash-coffee.jpg"}
            className={styles.storeImg}
            width={600}
            height={360}
            alt={`${name}`}
          />
        </div>
        <div className={`${styles.col2} ${homeStyles.glass}`}>
          <div className={styles.iconWrapper}>
            <Image 
              src={"/static/icons/places.svg"}
              width={28}
              height={28}
              alt="position icon"
            />
            <p className={styles.text}>{fixFrenchSpecialFont(address)}</p>
          </div>
          { crossStreet && crossStreet !== address &&
            <div className={styles.iconWrapper}>
              <Image 
                src={"/static/icons/nearMe.svg"}
                width={28}
                height={28}
                alt="nearMe icon"
              />
              <p className={styles.text}>{fixFrenchSpecialFont(crossStreet)}</p>
            </div>
          }
          <div className={styles.iconWrapper}>
            <Image 
              src={"/static/icons/locality.svg"}
              width={28}
              height={28}
              alt="city icon"
            />
            <p className={styles.text}>{postcode? `${postcode}, ${city}`: `${city}`}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image 
              src={"/static/icons/flag.svg"}
              width={28}
              height={28}
              alt="flag icon"
            />
            <p className={styles.text}>{country}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image 
              src={"/static/icons/info.svg"}
              width={28}
              height={28}
              alt="info icon"
            />
            <p className={styles.text}>{initialProps.coffeeStoreTips}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image 
              src={"/static/icons/star.svg"}
              width={28}
              height={28}
              alt="star icon"
            />
            <p className={styles.text}>{votingCount}</p>
          </div>
          <button
            className={styles.upvoteButton}
            onClick={handleUpvoteButton}>
              Up vote!
          </button>
        </div>
      </div>
    </div>
  )
};

export default CoffeeStore;     