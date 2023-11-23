import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { authorLinks } from '@/constants';

const GithubButton = () => {
  return (
    <a
      href={authorLinks.githubRepo}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="ghost"
        size="icon"
        className='rounded-full'
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </a>
  );
};

export default GithubButton;
