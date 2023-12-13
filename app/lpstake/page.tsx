"use client"

import { useState, useEffect, useRef, MutableRefObject } from "react"
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import {metadata,mainnet,projectId} from './../context/web3'

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

export default function Lpstake() {
    const [style, setStyle] = useState({
        background: 'radial-gradient(40% 50% at 50% 20%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)', 
        filter: 'blur(15px)',
        zIndex: '10'
      })
  
      const [temp, ] = useState(Array(2))
      
      const handleMouseover = (e:any) => {
        temp[0] = e.target.offsetLeft;
        temp[1] = e.target.offsetTop;
        const xdif = 0 - temp[0];
        const ydif = 0 - temp[1];
  
        const style:any = {
          // background: 'radial-gradient(60% 60% at 50% 50%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)', 
          filter: 'blur(15px)',
          zIndex: '10',
          animationPlayState: 'paused',
          transform: `translate(${xdif}px, ${ydif}px) scale(1.8, 1.2)`,
          transition: 'transform 2s, background 2s linear 2s'
        }
        setStyle(style)
      }
  
      const handleMouseLeave = (e:any) => {
        const style = {
          background: 'radial-gradient(30% 50% at 50% 40%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)', 
          filter: 'blur(15px)',
          zIndex: '10',
          animationPlayState: 'running',
          transition: 'transform 2s'
        }
        setStyle(style)
      }
      const { open } = useWeb3Modal()
    const { address='', chainId, isConnected } = useWeb3ModalAccount()
      const reducedAddress=(_address="")=>{
        return _address.slice(0,5)+"..."+_address?.slice(_address.length-5)
      }
    return (
      <main>
        <div className='flex justify-center pt-20 pb-40 sm:pb-0'>
          <div className="w-[330px] rounded-[28px] bg-[#161616] border border-[#b89ba12e] shadow-md">
            <div className="flex justify-between px-[18px] py-[21px] border-b-[1px] border-[#b89ba12e]">
                <div className="text-white text-[26px]">LP Stake</div>
                <div className="text-[#9b9ca1]">
                    <div>Block-WETH</div>
                    <div className="flex justify-end">$65.22</div>
                </div>
            </div>
            <div className="p-[18px]">
                <div className="flex justify-between text-[#9b9ca1] p-2 bg-[#3b3b3b2e] rounded-2xl border border-[#b89ba12e]">
                    <div>Current LP Staked</div>
                    <div className="align-top flex-row items-end">
                        <div className="text-white text-[23px] font-norma leading-[32.2px]">63.527</div>
                        <div className=" leading-[22.4px] flex justify-end">$4143.23</div>
                    </div>
                </div>
                <div className="flex justify-between text-[#9b9ca1] p-2 bg-[#3b3b3b2e] rounded-2xl mt-[18px] border border-[#b89ba12e]">
                    <div>LP Available to Stake</div>
                    <div>
                        <div className="text-white text-[23px] font-normal leading-[32.2px] text-[#33c6ab]">24.321</div>
                        <div className=" leading-[22.4px] flex justify-end">$1586.21</div>
                    </div>
                </div>
                <div className="flex justify-between text-[#9b9ca1] p-2 bg-[#3b3b3b2e] rounded-2xl mt-[18px] border border-[#b89ba12e]">
                    <div>ETH Earnings</div>
                    <div>
                        <div className="text-white text-[23px] font-normal leading-[32.2px] text-[#33c6ab] flex justify-end">1.779</div>
                        <div className="leading-[22.4px] flex justify-end">$3182.63</div>
                    </div>
                </div>
                <div className="text-center"><span className="text-xs text-[#9b9ca1]">unStaking before unlock incurs a early withdraw fee</span></div>
                <div className="flex flex-row justify-between mt-2">
                    <div>
                        <p className="text-xs text-[#9b9ca1] text-center mb-1">Locks of 4 days</p>
                        <p className='w-[135px] text-[#fbfbfb] py-[12px] bg-[#3b3b3b3e] border-2 border-[#b89ba12e] rounded-[64px] text-center'>Stake</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#9b9ca1] text-center mb-1">01:06:25:06</p>
                        <p className='w-[135px] text-[#fbfbfb] py-[12px] bg-[#3b3b3b3e] border-2 border-[#b89ba12e] rounded-[64px] text-center'>unStake</p>
                    </div>
                </div>
                <div className="flex relative mt-[36px] mb-2 w-[292px] h-[52px] justify-center items-center cursor-pointer animate-btn "  onClick={()=>open()}>
                  <div className="absolute w-[292px] bg-[#ffffff2e] rounded-[188px] h-[52px]" style={{zIndex: '5'}}></div>
                  <div 
                    className="absolute w-[292px] h-[40px] animate-div" 
                    style={style} 
                    onMouseOver={(e) => handleMouseover(e)}
                    onMouseLeave={(e) => handleMouseLeave(e)}></div>
                  <div className="absolute w-[288px] h-[48px] p-[2px] z-15 rounded-[72px] bg-[#161616] pointer-events-none" style={{zIndex: '15'}}></div>
                  <p className="text-[18px] text-[#33c6ab] relative z-30 pointer-events-none" style={{zIndex: '30'}} >{isConnected?reducedAddress(address):"Connect Wallet"}</p>
                </div>
            </div>
          </div>
        </div>
      </main>
    )
}
