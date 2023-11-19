import { ListArticle, SideContent } from '@/features/home';
import { description, keywords, title } from '@/lib/meta-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: title + '- Home',
  description: description,
  keywords: keywords,
};

export default async function Home() {
  return (
    <div className="flex mx-[100px]">
      <ListArticle />
      <SideContent />
    </div>
  );
}
