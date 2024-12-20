'use client';

import React, { useState } from 'react';
import { useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaCheck, FaCopy } from 'react-icons/fa'; // Import icons

const Header = () => {
  const router = useRouter();
  const { login, authenticated, user } = usePrivy();
  const { logout } = useLogout();
  const [copied, setCopied] = useState(false);

  const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = () => {
    if (user?.wallet?.address) {
      navigator.clipboard.writeText(user.wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="flex items-center justify-between py-6 px-8">
      <h1 className="text-2xl font-bold" onClick={() => router.push('/')}>Fundev</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#funders" className="hover:text-gray-300">Funders</a></li>
          <li><a href="#maintainers" className="hover:text-gray-300">Maintainers</a></li>
          <li><a href="#developers" className="hover:text-gray-300">Developers</a></li>
          <li><a href="#validators" className="hover:text-gray-300">Validators</a></li>
          <li><a href="#" className="hover:text-gray-300">Docs</a></li>
          <li><a href="#" className="hover:text-gray-300" onClick={() => router.push('/issues')}>Issues</a></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        {authenticated && user?.wallet?.address && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {truncateAddress(user.wallet.address)}
            </span>
            <button
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-gray-300 focus:outline-none"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
            </button>
          </div>
        )}
        {authenticated ? (
          <Button className={'capitalize'} onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button className={'capitalize'} onClick={login}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;