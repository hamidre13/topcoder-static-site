import Link from 'next/link'
import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Link href="/pages">
        <a>pages</a>
      </Link>
      <br />
      <Link href="/posts">
        <a>posts</a>
      </Link>
    </div>
  );
}
