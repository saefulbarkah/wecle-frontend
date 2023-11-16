import { description, keywords, title } from '@/lib/meta-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: title + '- Home',
  description: description,
  keywords: keywords,
};

export default async function Home() {
  return (
    <p className="text-secondary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
      accusamus aperiam omnis iusto explicabo. Quisquam reprehenderit explicabo
      laborum sunt, itaque obcaecati quam fuga ratione non! Odio dignissimos
      rerum repudiandae modi.
    </p>
  );
}
