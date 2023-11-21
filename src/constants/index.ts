type AuthorLinks = {
  authorName: string;
  githubLink: string;
  githubRepo: string;
};

type FontFamilyList = {
  label: string;
  value: string;
}[];

export const authorLinks: AuthorLinks = {
  authorName: 'Kyle',
  githubLink: 'https://github.com/kt946',
  githubRepo: 'https://github.com/kt946/blink-reader',
};

export const fontFamilyList: FontFamilyList = [
  { label: 'Default', value: 'font-sans' },
  { label: 'Serif', value: 'font-serif' },
  { label: 'Roboto', value: 'font-roboto' },
  { label: 'Open Sans', value: 'font-openSans' },
  { label: 'Inter', value: 'font-inter' },
  { label: 'Ubuntu', value: 'font-ubuntu' },
  { label: 'Lato', value: 'font-lato' },
  { label: 'Montserrat', value: 'font-montserrat' },
  { label: 'Poppins', value: 'font-poppins' },
  { label: 'Nunito', value: 'font-nunito' },
  { label: 'Nunito Sans', value: 'font-nunitoSans' },
  { label: 'Source Sans Pro', value: 'font-sourceSansPro' },
  { label: 'Oswald', value: 'font-oswald' },
  { label: 'Raleway', value: 'font-raleway' },
  { label: 'Palanquin', value: 'font-palanquin' },
  { label: 'Playfair', value: 'font-playfair' },
];
