import SectionFlow from "./SectionFlow";

export default async function StudentSectionPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const sectionNumber = Number(number);
  return <SectionFlow sectionNumber={sectionNumber} />;
}
