import Link from "next/link";

export default function Custom404() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>
        <Link href={`/`}>
          <a>Go to homepage</a>
        </Link>
      </p>
    </div>
  );
}
