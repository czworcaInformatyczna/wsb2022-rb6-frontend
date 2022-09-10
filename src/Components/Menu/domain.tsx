export type Nested = {
  [key: number]: boolean;
};

export interface menuProps {
  open: boolean;
}

export interface WrapProps {
  if: boolean;
  with: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
}
