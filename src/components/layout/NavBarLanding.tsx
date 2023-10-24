import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from './Modal';
import CloseIcon from './CloseIcon';
import AppStoreSVG from '../LandingPage/AppStoreSVG';
import GooglePlaySVG from '../LandingPage/GooglePlaySVG';

const NavBarLanding = () => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const onClickHandler = () => {
        modalRef.current!.showModal();
    };

    const modalCloseHandler = () => {
        modalRef.current!.close();
    };

    return (
        <nav className='relative z-20 h-14 bg-white'>
            <menu className='mx-auto my-0 flex h-full max-w-[1120px] items-center justify-between px-[16px] py-[8px]'>
                {/* Logo-Link */}
                <Link className='flex gap-1' href={'/'}>
                    <Image
                        src={'/Layout/logo-reel.png'}
                        height={26}
                        width={24}
                        alt='Reel Talk Logo Reel'
                    ></Image>
                    <h1 className='hidden text-[17px] font-bold text-secondary md:block'>
                        REEL TALK
                    </h1>
                </Link>

                {/* Download app Button */}
                <button
                    onClick={onClickHandler}
                    className='rounded bg-primary px-4 py-[6px] font-semibold tracking-[0.08px] text-secondary'
                >
                    Download
                </button>
            </menu>

            <Modal
                className='h-fit w-[352px] flex-col p-6 pb-14 lg:pb-8'
                ref={modalRef}
            >
                {/* Close Button Container */}
                <div className='flex justify-end'>
                    <button onClick={modalCloseHandler}>
                        <CloseIcon />
                    </button>
                </div>

                <div className='mt-8 hidden flex-col items-center gap-4 lg:flex'>
                    <h2 className='whitespace-nowrap text-center text-base font-semibold leading-normal tracking-[0.08px] text-secondary'>
                        Scan the QR code to download Reel Talk
                    </h2>
                    <Image
                        src={'/LandingPage/qr-code.png'}
                        height={96}
                        width={96}
                        alt=''
                    ></Image>
                </div>

                <div className='mt-6'>
                    <h2 className='text-center text-base font-semibold leading-normal tracking-[0.08px]'>
                        Download from app stores
                    </h2>
                    <div className='mt-4 flex flex-col items-center gap-2'>
                        <Link href={'/'}>
                            <AppStoreSVG width={136} height={42} />
                        </Link>
                        <Link href={'/'}>
                            <GooglePlaySVG width={136} height={40.523} />
                        </Link>
                    </div>
                </div>
            </Modal>
        </nav>
    );
};

export default NavBarLanding;
