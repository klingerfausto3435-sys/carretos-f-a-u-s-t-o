type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Largura máxima e gutter lateral consistentes em toda a página. */
export function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
