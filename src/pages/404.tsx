import Link from 'next/link';

export default function Custom404() {
  return (
    <main className='flex h-screen items-center justify-center text-high-emphasis'>
      <div>
        <h1>404 - That page does not seem to exist...</h1>
        <div className='h-[258px] w-[343px] md:h-[362px] md:w-[480px]'>
          <iframe
            src='https://giphy.com/embed/l2JehQ2GitHGdVG9y'
            width='100%'
            height='100%'
            allowFullScreen
          ></iframe>
        </div>
        <Link
          className='mt-1 inline-block rounded-sm bg-primary p-1 px-2 font-bold text-secondary'
          href='/onboarding'
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
