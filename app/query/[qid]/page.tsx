export default function QueryPage({ params }: { params: { qid: string } }) {
  return <div>{params.qid}</div>;
}
