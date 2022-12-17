import styles from "../styles/flaticonAttribution.module.css";
import Link from "next/link";

type FlaticonAttributionProps = {
  name: string,
  alias?: string
};

export default function FlaticonAttribution({ name, alias = null }: FlaticonAttributionProps) {
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
