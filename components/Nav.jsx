"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

  const {data:session} = useSession();
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PromptsNation logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text">PromptsNation</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              {" "}
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in{" "}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                settoggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_Link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_Link"
                  onClick={() => settoggleDropdown(false)}
                >Create Prompt
                </Link>
                <button type="button" className="mt-5 w-full black_btn" onClick={ () =>{
                    settoggleDropdown(false);
                    signOut();
                } }>Sig Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in{" "}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
