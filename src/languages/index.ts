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

function __(reqGroup: string, reqString: string): string {
  return '';
}

export default __;
