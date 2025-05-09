import HelpSupportDetail from './HelpSupportDetail';

export default function Page({ params }: { params: { helpSupportId: string } }) {
  return <HelpSupportDetail helpSupportId={params.helpSupportId} />;
}
