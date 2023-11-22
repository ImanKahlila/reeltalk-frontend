import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CreatedCommunityPage = () => {
    const router = useRouter();
    const { communityId } = router.query;
    return (
        <>
            <picture className='relative mx-auto block h-[11.11vw] max-h-[160px] w-full max-w-[1440px]'>
                <Image src={'/batman.png'} fill alt=''></Image>
                <div className='bg-custom-gradient relative h-full w-full bg-black'></div>
            </picture>
            <section>{communityId}</section>
        </>
    );
};

export default CreatedCommunityPage;
