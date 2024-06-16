import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopUserMovies from '@/components/profile/TopUserMovies';
import TopUserShows from '@/components/profile/TopUserShows';
import CheckIconSVG from '@/components/Icons/CheckIcon';

export const AboutMe = ({ userId }: any) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, idToken } = useUserContext();
  const AchievementCriteria = [
    { level: "Reel Apprentice", icon: "🎒", requirements: ["Select top genres", "Select top 5 movies","Select top 5 shows"] , reward: 0 },
    { level: "Reel Enthusiast", icon: "🍿", requirements: ["Add a Profile Pic"], reward: 0  },
    { level: "Reel Buff", icon: "🎞️", requirements: ["Add a Bio"], reward: 10 },
    { level: "Reel Addict", icon: "🔥", requirements: ["Join a discussion", "Review a movie / TV Show"], reward: 25 },
    { level: "Reel Fanatic", icon: "❤️‍🔥", requirements: ["Rate 10" +
      " Movies/Shows"], reward: 40 },
    { level: "Reel Fiend", icon: "📽️", requirements: ["Review 10 Movies/Shows"], reward: 50 },
    { level: "Reel Aficionado", icon: "🎥", requirements: ["Join 10 Communities"], reward: 75 },
    { level: "Reel Cinephile", icon: "🎬", requirements: ["Start 10 Discussions"], reward: 125 },
    { level: "Reel Connoisseur", icon: "🎖️", requirements: ["Rate 50 Movies/Shows"], reward: 175 },
    { level: "Reel Virtuoso", icon: "🏅", requirements: ["Review 50 Movies/Shows"], reward: 250 },
    { level: "Reel Savant", icon: "🏆", requirements: ["Start 20 Discussions", "Amass 100 Ratings"], reward: 1000 },
  ];


  const ProfileAchievements = () => {
    const [userAchievements, setUserAchievements] = useState([]);
    const [profileStrength, setProfileStrength] = useState("Novice");
    const [nextLevel, setNextLevel] = useState<any>();
    // for nextLevel
    const [strengthPercentage, setStrengthPercentage] = useState(0);
    const [currentRequirementIndex, setCurrentRequirementIndex] = useState(0); // Initialize to 0

    useEffect(() => {
      if (!userInfo) return;

      // Determine Achievements
      const achieved: any[] = [];
      let strength = "Novice";
      let percentage = 0;
      let nextReqIndex = 0;

      for (let i = 0; i < AchievementCriteria.length; i++) {
        const criteria = AchievementCriteria[i];

        // Check if the user has reached this level or any higher level
        if (userInfo.profileLevel === criteria.level) {
          // Add all previous achievements up to this level
          for (let j = 0; j <= i; j++) {
            achieved.push(AchievementCriteria[j]);
          }
          strength = criteria.level;
          percentage = ((i + 1) / AchievementCriteria.length) * 100;
          nextReqIndex = i + 1;
          break;
        }
      }

      setUserAchievements(achieved);
      setProfileStrength(strength);
      setStrengthPercentage(percentage);
      setCurrentRequirementIndex(nextReqIndex);

      // Determine next level and its requirements
      if (nextReqIndex < AchievementCriteria.length) {
        setNextLevel(AchievementCriteria[nextReqIndex]);
      } else{
        setNextLevel("null");
      }
      if(userAchievements.length  === AchievementCriteria.length){
        setNextLevel("Congrats! you did it.")
      }
    }, [userInfo]); // Update when userInfo changes

    const nextRequirement = () => {
      if (currentRequirementIndex < AchievementCriteria.length - 1) {
        setCurrentRequirementIndex(currentRequirementIndex + 1);
        setNextLevel(AchievementCriteria[currentRequirementIndex + 1]);
      }
    };

    const prevRequirement = () => {
      if (currentRequirementIndex > 0) {
        setCurrentRequirementIndex(currentRequirementIndex - 1);
        setNextLevel(AchievementCriteria[currentRequirementIndex - 1]);
      }
    };

    return (
      <div className="profile-achievements p-4">
        <div className="absolute">
          <h2 className="tracking-eight text-xl text-high-emphasis">
            My Achievements
            ({userAchievements.length}/{AchievementCriteria.length})
          </h2>
          <div className="flex tracking-eight text-sm">
            <div className="text-neutral-400 mr-2 text-disabled">Profile
              Strength:
            </div>
            <div className="text-pure-white">
              {profileStrength} <span
              className="ml-1"> {AchievementCriteria.find(ac => ac.level === profileStrength)?.icon}</span>
            </div>
          </div>

          {nextLevel && (
            <div className="next-level text-medium-emphasis">
              <div className="mt-2 mb-2 profile-strength-bar">
                <div className="profile-strength-fill"
                     style={{ width: `${strengthPercentage}%` }}></div>
                {AchievementCriteria.map((criteria, index) => (
                  <div key={index}
                       className={`profile-strength-divider ${index < userAchievements.length ? 'filled' : ''}`}></div>
                ))}
              </div>

              {/* Diamonds section */}
              <div className="profile-strength-diamonds">
                {AchievementCriteria.length === userAchievements.length ? (
                  <div className="celebration">🎉</div>
                ) : (
                  AchievementCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className={`diamond ${criteria.reward > 0 && index >= userAchievements.length ? 'show' : 'hidden'}`}
                    >
                      {
                        criteria.reward > 0 && index >= userAchievements.length &&
                        <>
                          <span role="img" aria-label="diamond">💎</span>
                          <span className="reward">+{criteria.reward}</span>
                        </>
                      }
                    </div>
                  ))
                )}
              </div>

              {/* Level up message */}
              {typeof nextLevel === 'string' ? (
                <div className="next-level-text">
                  <p>{nextLevel}</p>
                </div>
              ) : (
                <div className="flex items-center text-sm">
            <span className="mt-2 font-thin">
              Level up to
              <span className="pl-1 font-semibold">{nextLevel.level}</span>
              <span className="pl-1 achievement-icon">{nextLevel.icon}</span>
            </span>
                </div>
              )}

              {/* Requirements List */}
              <ul
                className="text-medium-emphasis font-sans mt-3 list-disc list-inside">
                {nextLevel.requirements.map((req, index) => (
                  <li key={index} className="flex items-center text-left">
                    <CheckIconSVG className="mr-2"
                                  checked={isRequirementMet(req)} />
                    <span
                      className={isRequirementMet(req) ? 'line-through text-disabled' : ''}>{req}</span>
                  </li>
                ))}
              </ul>

              {/* Navigation Chevrons */}
              <div
                className="flex justify-center text-sm text-high-emphasis mt-3">
          <span onClick={prevRequirement}>
            <ChevronLeft
              className={`${currentRequirementIndex === 0 ? 'text-disabled' : ''}`} />
          </span>
                <span className="mx-2">
            {currentRequirementIndex + 1}/{AchievementCriteria.length}
          </span>
                <span onClick={nextRequirement}>
            <ChevronRight className={`${currentRequirementIndex === AchievementCriteria.length - 1 ? 'text-disabled' : ''}`} />
          </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3000/backend/api/user/profile/${userId}`,
        //   // `http://localhost:8080/api/user/profile/${userId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${idToken}`,
        //     },
        //   },
        // );
        // const userData = response.data.data;
        const userData = {
          'uid': '6PxTdBlaSpNQjrDaSVnH0oZCNxq2',
          'isPublic': true,
          'email': 'cikokwu@gmail.com',
          'profileLevel': 'Reel Addict',
          'birthday': {
            '_nanoseconds': 1123299328,
            '_seconds': 460684800000,
          },
          'displayName': 'chuka',
          'agreedToGuideline': true,
          'createdCommunities': [
            '0Ksv4Vz2xHzK1O3cGUZ1',
          ],
          'createdDiscussions': [
            'u9NXeWU5uVoczlnzrCrd',
            'kkcNe45t4X8cC7R5BzFO',
            '2zUPrIVA8kaouMPpSGqK',
            'WmPtDEKKWZ1N8Yc0imP6',
            'ao3Ma0IiQNQ3o82AqC4q',
            'Zs3a799lOLO2Vk6wRgcy',
            'hRZ47gLPrpR6lOQYQAB3',
            'caa8l6WJ7xr2xSvZ1NJV',
            'X1sPu7Cp8Wb938pmK2vs',
            'GEQClfa5vSrSEzcfcoVE',
            'ZKB2vIrUC42HLNAsYhTR',
            'Utp3XMUK2RoDvQjJtDG4',
          ],
          'name': 'Chuka',
          'favoriteMovies': [
            {
              'titleType': {
                'isEpisode': false,
                'text': 'Movie',
                'id': 'movie',
                'isSeries': false,
              },
              'primaryImage': {
                'width': 1383,
                'id': 'rm4023877632',
                'url': 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
                'height': 2048,
              },
              'releaseDate': {
                'month': 7,
                'year': 2008,
                'day': 24,
              },
              'titleText': {
                'text': 'The Dark Knight',
              },
              'id': 'tt0468569',
              'releaseYear': {
                'year': 2008,
              },
            },
            {
              'titleType': {
                'isEpisode': false,
                'text': 'Movie',
                'id': 'movie',
                'isSeries': false,
              },
              'primaryImage': {
                'width': 1396,
                'id': 'rm746868224',
                'url': 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                'height': 1982,
              },
              'releaseDate': {
                'month': 9,
                'year': 1972,
                'day': 28,
              },
              'titleText': {
                'text': 'The Godfather',
              },
              'id': 'tt0068646',
              'releaseYear': {
                'year': 1972,
              },
            },
            {
              'titleType': {
                'isEpisode': false,
                'text': 'Movie',
                'id': 'movie',
                'isSeries': false,
              },
              "primaryImage": {
                "width": 800,
                "id": "rm584928512",
                "url": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                "height": 1185
              },
              "releaseDate": {
                "month": 12,
                "year": 2003,
                "day": 17
              },
              "titleText": {
                "text": "The Lord of the Rings: The Return of the King"
              },
              "id": "tt0167260",
              "releaseYear": {
                "year": 2003
              }
            },
            {
              "titleType": {
                "isEpisode": false,
                "id": "movie",
                "text": "Movie",
                "isSeries": false
              },
              "primaryImage": {
                "width": 1055,
                "id": "rm1959546112",
                "url": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
                "height": 1536
              },
              "releaseDate": {
                "month": 12,
                "year": 1994,
                "day": 1
              },
              "titleText": {
                "text": "Pulp Fiction"
              },
              "id": "tt0110912",
              "releaseYear": {
                "year": 1994
              }
            },
            {
              "titleType": {
                "isEpisode": false,
                "text": "Movie",
                "id": "movie",
                "isSeries": false
              },
              "primaryImage": {
                "width": 1755,
                "id": "rm2442542592",
                "url": "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                "height": 2599
              },
              "releaseDate": {
                "month": 5,
                "year": 2000,
                "day": 18
              },
              "titleText": {
                "text": "Gladiator"
              },
              "id": "tt0172495",
              "releaseYear": {
                "year": 2000
              }
            }
          ],
          "favoriteGenres": [
            {
              "emoji": "💥",
              "name": "Action",
              "id": "g1"
            },
            {
              "emoji": "🪂",
              "name": "Adventure",
              "id": "g2"
            },
            {
              "emoji": "🖍️",
              "name": "Animation",
              "id": "g4"
            }
          ],
          "favoriteShows": [
            {
              "titleType": {
                "isEpisode": false,
                "id": "tvSeries",
                "text": "TV Series",
                "isSeries": true
              },
              "primaryImage": {
                "width": 1525,
                "id": "rm4086835200",
                "url": "https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
                "height": 2170
              },
              "releaseDate": {
                "month": 1,
                "year": 1999,
                "day": 10
              },
              "titleText": {
                "text": "The Sopranos"
              },
              "id": "tt0141842",
              "releaseYear": {
                "year": 1999,
                "endYear": 2007
              }
            },
            {
              "titleType": {
                "isEpisode": false,
                "id": "tvSeries",
                "text": "TV Series",
                "isSeries": true
              },
              "primaryImage": {
                "width": 1102,
                "id": "rm4204167425",
                "url": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
                "height": 1500
              },
              "releaseDate": {
                "month": 4,
                "year": 2011,
                "day": 17
              },
              "titleText": {
                "text": "Game of Thrones"
              },
              "id": "tt0944947",
              "releaseYear": {
                "year": 2011,
                "endYear": 2019
              }
            },
            {
              "titleType": {
                "isEpisode": false,
                "id": "tvSeries",
                "text": "TV Series",
                "isSeries": true
              },
              "primaryImage": {
                "width": 960,
                "id": "rm2076883969",
                "url": "https://m.media-amazon.com/images/M/MV5BNTllYzFhMjAtZjExNS00MjM4LWE5YmMtOGFiZGRlOTU5YzJiXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
                "height": 1440
              },
              "releaseDate": {
                "month": 6,
                "year": 2002,
                "day": 2
              },
              "titleText": {
                "text": "The Wire"
              },
              "id": "tt0306414",
              "releaseYear": {
                "year": 2002,
                "endYear": 2008
              }
            },
            {
              "titleType": {
                "isEpisode": false,
                "id": "tvSeries",
                "text": "TV Series",
                "isSeries": true
              },
              "primaryImage": {
                "width": 1280,
                "id": "rm2849806081",
                "url": "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
                "height": 1922
              },
              "releaseDate": {
                "month": 1,
                "year": 2021,
                "day": 13
              },
              "titleText": {
                "text": "The Office"
              },
              "id": "tt0386676",
              "releaseYear": {
                "year": 2005,
                "endYear": 2013
              }
            },
            {
              "titleType": {
                "isEpisode": false,
                "id": "tvSeries",
                "text": "TV Series",
                "isSeries": true
              },
              "primaryImage": {
                "width": 2700,
                "id": "rm553794049",
                "url": "https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
                "height": 4000
              },
              "releaseDate": {
                "month": 1,
                "year": 2023,
                "day": 15
              },
              "titleText": {
                "text": "The Last of Us"
              },
              "id": "tt3581920",
              "releaseYear": {
                "year": 2023
              }
            }
          ],
          "location": "Los Angeles, CA",
          "imageUrl": "https://storage.googleapis.com/reeltalk-app.appspot.com/profilePhotos/6PxTdBlaSpNQjrDaSVnH0oZCNxq2?GoogleAccessId=firebase-adminsdk-147wm%40reeltalk-app.iam.gserviceaccount.com&Expires=16447017600&Signature=Fh7wE8IL8GDE2UmDZQ0sF1UKK8Dtb14rBBlN5As4USQpM7iDJf4nNgsQjFiBreBU7yJXKhUowM83eTNJdsQoHxFIUbe922Rexv8xKMgclZjY3kXg%2F1a5FWz%2F%2BWNbp5wzGJADvuGQWz%2F0SJIC9d7E69ioTXQWkQ5%2BNSEj0GlsoiSLaYBuQqIghGfgdgVe48u7O5qk64FuAFjxDB5f%2Fjzeg6eqx7w0XgXChx691c4kz0cz0Udt0SsMzSKwDD9Ug6iR14UW12hpAV8vKsp0Wx8B%2B7ILho%2Brj%2Bc%2FUUlDbnQZ5q9YeGWcPARAcX8CAukyYqq0VOs7OnOK3S4vKNW1X5ItgA%3D%3D",
          "joinedCommunities": {
            "Ig7p5QapzAcrHjrb80VV": {
              "_nanoseconds": 675000000,
              "_seconds": 1713937319
            },
            "AAWs05mY921DY4RWNdiN": {
              "_seconds": 1715623643,
              "_nanoseconds": 306000000
            }
          }
        };
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, idToken]);
  const isRequirementMet = (requirement: string) => {
    return checkRequirement(userInfo, requirement);
  };

  const checkRequirement = (userInfo: any, requirement: string) => {
    switch (requirement) {
      case "Select top genres":
        return userInfo.favoriteGenres && userInfo.favoriteGenres.length > 0;
      case "Select top 5 movies":
        return userInfo.favoriteMovies && userInfo.favoriteMovies.length >= 5;
      case "Select top 5 shows":
      return userInfo.favoriteShows && userInfo.favoriteShows.length >= 5;
      case "Add a Profile Pic":
        return Boolean(userInfo.imageUrl);
      case "Add a Bio":
        return Boolean(userInfo.bio);
      case "Join a discussion":
        return userInfo.createdDiscussions && userInfo.createdDiscussions.length > 0;
      case "Review a movie / TV Show":
        return userInfo.reviews && userInfo.reviews.length > 0;
      case "Rate 10 Movies/Shows":
        return userInfo.ratings && userInfo.ratings.length >= 10;
      case "Review 10 Movies/Shows":
        return userInfo.reviews && userInfo.reviews.length >= 10;
      case "Join 10 Communities":
        return userInfo.joinedCommunities && Object.keys(userInfo.joinedCommunities).length >= 10;
      case "Start 10 Discussions":
        return userInfo.createdDiscussions && userInfo.createdDiscussions.length >= 10;
      case "Rate 50 Movies/Shows":
        return userInfo.ratings && userInfo.ratings.length >= 50;
      case "Review 50 Movies/Shows":
        return userInfo.reviews && userInfo.reviews.length >= 50;
      case "Start 20 Discussions":
        return userInfo.createdDiscussions && userInfo.createdDiscussions.length >= 20;
      case "Amass 100 Ratings":
        return userInfo.ratings && userInfo.ratings.length >= 100;
      default:
        return false;
    }
  };
  return (
    <div className='mx-auto flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
      {isLoading ? (
        <Skeleton className='w-full' />
      ) : (
        <>
          <div className='flex w-full flex-col gap-4 rounded-[8px]'>
            <div className='flex w-full flex-col rounded-[8px] bg-first-surface px-4 pb-[100px] pt-4 h-[280px]'>
                <ProfileAchievements/>
            </div>

            <div className='flex w-full justify-between gap-4 rounded-[8px] bg-first-surface px-4 py-4'>
              <p className='text-medium-emphasis'>Your Screen Gems <span className="ml-2 text-primary">ⓘ</span></p>
              <p className='pr-8 text-medium-emphasis font-bold'>{userInfo?.gems || 10}💎</p>
            </div>
          </div>

          <div className='w-full max-w-[372px]'>
            <div className='mb-8'>
              <div className='mb-8'>
                <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>
                  Favorite genres
                </h2>
                <p className='mb-2 tracking-eight text-medium-emphasis'>
                  {userInfo?.favoriteGenres?.[0]?.name}, {userInfo?.favoriteGenres?.[1]?.name}, and{' '}
                  {userInfo?.favoriteGenres?.[2]?.name}
                </p>
              </div>

              <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 Movies</h2>
              <div className='flex space-x-2'>
                {userInfo?.favoriteMovies?.map((movie: any) => (
                  <TopUserMovies key={movie?.id} poster={movie?.primaryImage?.url} />
                ))}
              </div>

              <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 TV shows</h2>
              <div className='flex space-x-2'>
                {userInfo?.favoriteShows?.map((show: any) => (
                  <TopUserShows key={show?.id} poster={show?.primaryImage?.url} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};