import { FaHeart } from 'react-icons/fa';

import { authorLinks } from '@/constants';
import GithubButton from './github-button';

const Footer = () => {
  return (
    <footer className="container max-sm:px-6 max-sm:py-2 py-4 md:py-0">
      <div className="flex items-center justify-between gap-4 md:h-24">
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
        <GithubButton />
      </div>
    </footer>
  );
};

export default Footer;
