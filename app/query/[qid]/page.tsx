"use client";
import { useParams } from "next/navigation";
export default function QueryPage() {
  const { qid } = useParams();
  return <main className="pt-16">Query: {qid}</main>;
}
