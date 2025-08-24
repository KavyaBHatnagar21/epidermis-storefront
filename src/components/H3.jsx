import clsx from 'clsx';

export default function H3({ children, className, ...props }) {
  return (
    <h3
      className={clsx("font-cursive text-primary py-8 text-5xl tracking-widest", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
