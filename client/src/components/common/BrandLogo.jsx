import { Link } from "react-router-dom";

const BrandLogo = ({
  to = "/",
  size = 44,
  label = "Namo Academy",
  showText = true,
  textClassName = "",
  className = ""
}) => (
  <Link to={to} className={`inline-flex items-center gap-3 ${className}`}>
    <img
      src="/NA-logo.png"
      alt={`${label} logo`}
      width={size}
      height={size}
      className="rounded-xl object-cover"
    />
    {showText ? (
      <span className={`font-heading text-xl font-bold text-brand-700 ${textClassName}`}>
        {label}
      </span>
    ) : null}
  </Link>
);

export default BrandLogo;
