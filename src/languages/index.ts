import languages from './languages.json';

export interface Language {
  language: string;
  groups: {
    zoom: {
      in: string;
      out: string;
      reset: string;
    };
    attribution: {
      title: string;
    };
    popup: {
      address: string;
      time: string;
      description: string;
      contact: string;
      email: string;
      website: string;
    };
  };
}

export type ReqGroup = 'zoom' | 'attribution' | 'popup';

function __(reqGroup: ReqGroup, reqString: string): string {
  let lang = document.documentElement.lang ?? 'en';

  if (lang.length > 2) {
    lang = lang.split(lang[2])[0];
  }

  const language: Language =
    languages.find((language) => language.language === lang) ??
    languages[0];

  const group = language.groups[reqGroup as keyof Object];

  const string = group[reqString as keyof Object] ?? '';

  return string as string;
}

export default __;
