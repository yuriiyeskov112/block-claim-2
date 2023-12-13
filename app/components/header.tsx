'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation"
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import {metadata,mainnet,projectId} from './../context/web3'

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId
  })

export default function Header() {
    const [isOpen, setIsOpen] = useState(false); 
    const [headerStyle, setHeaderStyle] = useState({}); 
    const [logoStyle, setLogoStyle] = useState({});

    const router = useRouter()
    const pathname = usePathname();

    const handleClick = () => {
        setIsOpen(!isOpen);
        const headerStyle = {
            width: '100%',
            transform: 'scaleY(100vh/113px)',
            transition: 'transform 3s',
            zIndex: '50'
        }
        const logoStyle = {
            trasnform: 'translate3d(100px, 0, 0)',
            transition: 'transform 2s linear 2s'
        }
        setHeaderStyle(headerStyle)
        setLogoStyle(logoStyle)
    };

    const navigateTo = (path: string) => {
        setIsOpen(false)
        router.push(path)
    }
    const { open } = useWeb3Modal()
    const reducedAddress=(_address="")=>{
        return _address.slice(0,5)+"..."+_address?.slice(_address.length-5)
      }
      const { address='', chainId, isConnected } = useWeb3ModalAccount()
    return (
        <header className={isOpen ? 'absolute flex flex-col items-center transition-height duration-1000 ease-in-out h-full bg-[#161616]': 'fixed w-full backdrop-blur-[5px] z-10'} style={headerStyle}>
            <div 
                className={
                    isOpen ? 
                        'flex justify-between items-center h-fit mt-[30px] gap-6' : 
                        'flex w-[100vw] sm:w-auto justify-between items-center px-5 py-4 border border-[#161616]'}>
                <div className='logo' style={logoStyle}>
                    <Image
                        width={123}
                        height={32}
                        src={'link.svg'}
                        alt='link'
                    />
                </div>
                <div className='justify-between gap-6 hidden sm:flex'>
                    <Link href="/lpclaim" className={pathname == '/lpclaim' ? 'active' : 'non-active'}>LP Claim</Link>
                    <Link href="/lpclaim" className={pathname == '/lpstake' ? 'active' : 'non-active'}>LP Stake</Link>
                </div>
                <div className='connect-btn'>
                    <p className='text-[#fbfbfb] px-6 py-[12px] bg-[#3b3b3b3e] border-2 border-[#b89ba12e] rounded-[64px] cursor-pointer' onClick={()=>open()}>{isConnected?reducedAddress(address):"Connect"}</p>
                </div>
                <div className='sm:hidden burger-btn'>
                    <button onClick={handleClick} className="w-[35px] h-[35px] rounded-lg bg-white flex flex-col justify-center items-center">
                        <span className={`bg-black block transition-all duration-300 ease-out 
                                        h-0.5 w-6 rounded-sm ${isOpen ? 
                                        'rotate-45 translate-y-1' : '-translate-y-0.5'
                                        }`} >
                        </span>
                        <span className={`bg-black block transition-all duration-300 ease-out 
                                        h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 
                                        'opacity-0' : 'opacity-100'
                                        }`} >
                        </span>
                        <span className={`bg-black block transition-all duration-300 ease-out 
                                        h-0.5 w-6 rounded-sm ${isOpen ? 
                                        '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                                        }`} >
                        </span>
                    </button>
                </div>
            </div>
            <div className='relative'>
                {
                    isOpen ?
                    <div className='relative right-[0px] flex flex-col px-4 py-4 text-2xl text-[#fbfbfb] mt-6'>
                        <Link href="/lpclaim" className={`py-4 + ${pathname == '/lpclaim' ? 'active' : 'non-active'}`} onClick={() => navigateTo('/lpclaim')}>LP Claim</Link>
                        <Link href="/lpclaim" className={`py-4 + ${pathname == '/lpstake' ? 'active' : 'non-active'}`} onClick={() => navigateTo('/lpstake')}>LP Stake</Link>
                    </div>
                    : null
                }
            </div>
        </header>
    )
}