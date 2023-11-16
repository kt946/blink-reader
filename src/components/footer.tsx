import { FaHeart } from 'react-icons/fa';

import { authorLinks } from '@/constants';

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="flex items-center text-muted-foreground text-sm">
          Made with <FaHeart className="mx-1" /> from
          <a
            href={authorLinks.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-semibold underline underline-offset-4"
          >
            {authorLinks.authorName}
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
