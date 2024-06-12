export default function Button({ children, textOnly, className, ...rest }) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...rest}>
      {children}
    </button>
  );
}
