import PersonLab from "./PersonLab";

export default async function PersonPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <PersonLab code={decodeURIComponent(code)} />;
}
