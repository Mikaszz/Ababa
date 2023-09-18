'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Navbar, Container, Navv, Button } from 'react-bootstrap';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav
      className="nav"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      {/* Logo on the left */}
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={require('/public/assets/icons/Netflix.png')}
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </Link>

      {/* Content on the right */}
      <div className="flex gap-3 md:gap-5 items-center">
        {session?.user ? (
          <>
            <button type="button" onClick={signOut} className="transparent_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
