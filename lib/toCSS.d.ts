/** ./lib/toCSS.mjs */
export declare const toCSS: ({
  obj,
  links,
  varPrefix,
  separator,
  cssContext,
  colors,
}: {
  obj: {
    [key: string]: {
      [key: string]: string;
    };
  };
  links: {
    from: {
      key: string;
    };
    to: {
      key: string;
    };
  }[];
  varPrefix?: string | undefined;
  separator?: string | undefined;
  cssContext?: string | undefined;
  colors: {
    [key: string]: string;
  };
}) => string;

