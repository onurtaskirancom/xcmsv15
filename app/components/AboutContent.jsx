'use client';
import ScrollButton from '../components/ScrollButton';
import Image from 'next/image';
import { useContext } from 'react';
import ThemeContext from '../context/theme';
import {
  FaNodeJs,
  FaReact,
  FaAngular,
  FaServer,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { DiDotnet } from 'react-icons/di';
import { BiLogoMongodb } from 'react-icons/bi';
import {
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobeindesign,
  SiAdobeillustrator,
} from 'react-icons/si';

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`min-h-screen lg:pl-24 lg:pr-24 lg:pt-5 max-sm:p-5 ${
          theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-black'
        }`}
      >
        <h2
          className={`text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl dark:text-tahiti-title mb-6  ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
          }`}
        >
          About Onur Taşkıran
        </h2>
        <Image
          className="float-right pl-8 mb-8 max-w-full rounded-lg"
          src="/images/onur-taskiran-profile.jpg"
          alt="onurtaskiran"
          width={430}
          height={511}
        />
        <p
          className={`mb-4 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
          }`}
        >
          Hi my friend, I'm Onur Taşkıran. I live in Istanbul. I have been
          dealing with software and graphic design for many years, love to
          listen to Metallica while writing the code. I am learning new
          technologies now and I will continue to learn. I care about reason and
          science. People should also care so i think it is... Also I am a
          professional athlete. I have three licenses in kickboxing, boxing and
          Muay Thai. Sports and software are an indispensable part of my life
          definition...
        </p>
        <p
          className={`mb-4 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
          }`}
        >
          Follow me maybe one day i can buy you coffee. Come on take care.
          Despite everything, this boy loves you all.
        </p>
        <p
          className={`mb-4 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
          }`}
        >
          <strong className="dark:text-tahiti-dark">My favorite songs: </strong>
          Metallica - One, Metallica - My Friend Of Misery, Metallica -
          Blackened, Metallica - Turn The Page, Limp Bizkit - Take A Look
          Around, Limp Bizkit - Break Stuff, Alabama 3 - Sad Eyed Lady Of The
          Lowlife, The Handsome Family - Far From Any Road, Stick Figure -
          Paradise, Stick Figure - Once in a Lifetime
        </p>
        <p
          className={`mb-4 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
          }`}
        >
          <strong className="dark:text-tahiti-dark">
            My favorite movies:{' '}
          </strong>
          The Godfather, Papillon (1973), Pulp Fiction, The Hateful Eight,
          Sherlock Holmes (2009), The Lord of the Rings: The Two Towers, The
          Game (1997), No Country For Old Men, Lost Highway, Warrior, Undisputed
          3, The Matrix, The Usual Suspects, 1408 (2007)
        </p>
        <p
          className={`mb-4 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-900'
          }`}
        >
          <strong className="dark:text-tahiti-dark">
            My favorite Tv Series:{' '}
          </strong>
          Vikings, Van Helsing, Mr. Robot, Sherlock, Spartacus, Peaky Blinders,
          Banshee, Narcos, Prison Break, House of Cards, La Case De Papel, The
          Mentalist
        </p>
        <blockquote
          className={`relative border-l-4 pl-4 sm:pl-6 ${
            theme === 'dark'
              ? 'border-tahiti-title text-zinc-200'
              : 'border-gray-300 text-gray-900'
          }`}
        >
          <p className="mb-2">
            <strong className="dark:text-tahiti-dark">
              My favorite quotations:
            </strong>
          </p>
          <p className="mb-2">
            "It is the power of the mind to be unconquerable..." - Seneca
          </p>
          <p className="mb-2">
            "I will either find a way, or make one." - Hannibal Barca{' '}
          </p>
          <p className="mb-2">
            "Give me six hours to chop down a tree and I will spend the first
            four sharpening the axe." - Abraham Lincoln
          </p>
          <p className="mb-2">
            "All men can see these tactics whereby I conquer, but what none can
            see is the strategy out of which victory is evolved." - Sun Tzu
          </p>
        </blockquote>
        <h6 className="text-2xl font-bold mt-8 mb-4 dark:text-tahiti-title">
          SOFTWARE SKILLS
        </h6>
        <div className="flex flex-wrap mb-8">
          <FaReact className="w-16 h-16 m-2 text-sky-300" title="React" />
          <FaNodeJs className="w-16 h-16 m-2 text-green-700	" title="Node.js" />
          <IoLogoJavascript
            className="w-16 h-16 m-2 text-yellow-300	"
            title="JavaScript"
          />
          <FaAngular className="w-16 h-16 m-2 text-rose-500" title="Angular" />
          <DiDotnet className="w-16 h-16 m-2 text-indigo-400" title="ASP.NET" />
          <BiLogoMongodb
            className="w-16 h-16 m-2 text-emerald-700"
            title="MongoDB"
          />
          <FaServer
            className="w-16 h-16 m-2 text-orange-200"
            title="MS Server"
          />
          <FaHtml5 className="w-16 h-16 m-2 text-orange-500" title="HTML5" />
          <FaCss3Alt className="w-16 h-16 m-2 text-sky-600" title="CSS" />
        </div>
        <h6 className="text-2xl font-bold mt-8 mb-4 dark:text-tahiti-title">
          GRAPHIC SKILLS
        </h6>
        <div className="flex flex-wrap mb-8">
          <SiAdobephotoshop
            className="w-16 h-16 m-2 text-sky-500"
            title="Adobephotoshop "
          />
          <SiAdobeillustrator
            className="w-16 h-16 m-2 text-orange-500"
            title="Illustrator"
          />
          <SiAdobeindesign
            className="w-16 h-16 m-2 text-rose-600"
            title="Adobeindesign "
          />
          <SiAdobepremierepro
            className="w-16 h-16 m-2 text-violet-400"
            title="Adobepremierepro "
          />
        </div>
      </div>
      <ScrollButton />
    </>
  );
};

export default AboutPage;
