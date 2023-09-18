"use client";


import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Navbar, Container, Navv, Button } from 'react-bootstrap';
import axios from 'axios';
import data1 from "/utils/data.json";
import ModalVideo from 'react-modal-video';




const Feed = () => {
  
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []); 

  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
        try {
            const response = await fetch(data1);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    })();
}, []);

const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    if (currentIndex < data1.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [currentBackground, setCurrentBackground] = useState( );

  const toggleBackground = () => {
    const currentIndex = backgrounds.indexOf(currentBackground);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    setCurrentBackground(backgrounds[nextIndex]);
  };

  function MyImageComponent() {
    const isAboveFold = true;}


  return (
    <div className="flex flex-col w-full  items-center justify-center h-[100vh]" >
     <img
  src={data1[currentIndex].Poster} 
 
  alt="Background"
  className="h-full w-[100%] z-1  bg-no-repeat  bg-center"/>     


    {session?.user ? (
      <>
       <div className="flex w-full justify-between fixed mb-[10vh] px-6 ">
         <button className="flex justify-start cursor-pointer" onClick={prevItem} disabled={currentIndex === 0}>
         <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
        </svg>           </button>

        <button className="flex justify-end " onClick={nextItem} disabled={currentIndex === data1.length - 1}>
        <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
        </svg>
  
        </button>
        </div>
        

    <div className="flex flex-row fixed   space-x-28 mt-[40vh]">
      <div className="flex flex-col items-start justify-start w-1/2 w-[70vh] h-[40vh]">
        <div className="Title">
        <h1 className="font-mono font-bold text-5xl text-white" loading="lazy">{data1[currentIndex].Title}</h1>
        </div>

        <div className="aboutFilm "> {/* Use flex-col and space-y for vertical stacking */}
          <div className="Data ">
          <Image src={require("/public/assets/icons/IMDB_Logo_2016.svg")} alt="Imdb" width={35} height={35} />
          <p className="text-yellow-400"> &nbsp;{data1[currentIndex].imdbRating} </p>
          </div>

          <div className="Data">
          <Image src={require("/public/assets/icons/time.png")} alt="Time" width={20} height={15} />
          <p className="text-white">{data1[currentIndex].Runtime}</p>
          </div>

          <div className="Data">
          <Image src={require("/public/assets/icons/stack.png")} alt="Genre" width={20} height={15} />
          <p className="text-white">{data1[currentIndex].Genre}</p>
          </div>

          <div className="Data ">
          <Image src={require("/public/assets/icons/date.png")} alt="Data" width={20} height={15} />
          <p className="text-white">{data1[currentIndex].Released}</p>
          </div>
        </div>

      <div className="description ">
      <p className="text-white">{data1[currentIndex].Plot}</p>
      </div>

      {/* Watch Now and Trailer buttons */}
      <div className="Buttons ">
      <button className="red_btn">Watch Now</button>
      <button className="transparent_btn" onClick={openModal}>Trailer</button>
      </div>
    </div>
        <div className="flex w-1/2 flex-col ">
          <h2 className=" flex text-white ">Posters</h2>
          <div className="Poster">
           {data1[currentIndex].Images.map((imageUrl, index) => (
           <img  className="rounded-lg" key={index} src={imageUrl} alt={`Image ${index}`}  style={{ filter: 'grayscale(100%)', width:140, height:'auto'}} />
           ))}
         </div>
         </div>
         </div>

      </>
    ) : (
      <>
        <div></div>
      </>
    )}
</div>

  );
};

export default Feed;
