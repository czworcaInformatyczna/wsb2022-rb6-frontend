export type Nested = {
  [key: number]: boolean;
};

export type menuProps = {
  open: boolean;
};

export type WrapProps = {
  children: React.ReactNode;
  if: boolean;
  with: (children: React.ReactNode) => JSX.Element;
};
