declare module "@zachleat/snow-fall";

declare namespace JSX {
  interface IntrinsicElements {
    "snow-fall": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
