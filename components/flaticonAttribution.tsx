import Link from "next/link";

type FlaticonAttributionProps = {
  name: string,
  alias?: string
};

export default function FlaticonAttribution({ name, alias }: FlaticonAttributionProps) {
  return (
    <>
      <Link
        href={`https://www.flaticon.com/free-icons/${name}`}
        title={`${name} icons`}
        passHref={true}
      >
        {alias?alias:name}
      </Link>
    </>
  );
}
