import styles from "../styles/flaticonAttribution.module.css";
import Link from "next/link";

type FlaticonAttributionProps = {
  name: string,
  alias?: string
};

const FlaticonAttribution: React.FC<FlaticonAttributionProps> = ({ name, alias = null }) => {
  return (
    <>
      <Link
        className={styles.flaticonAttribution}
        href={`https://www.flaticon.com/free-icons/${alias ? alias : name}`}
        title={`${name} icons`}
      >
        {name}
      </Link>
    </>
  );
}

export default FlaticonAttribution;