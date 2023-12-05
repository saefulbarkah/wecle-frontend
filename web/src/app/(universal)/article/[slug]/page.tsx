import { Separator } from '@/components/ui/separator';
import { Comments, ShowArticle } from '@/features/article/show';
import { getServerSession } from '@/hooks/sessions/server';
import { keywords } from '@/lib/meta-data';
import { findArticle } from '@/services/article';
import { ApiResponse, ArticleType } from '@/types';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  try {
    const article: ApiResponse<ArticleType> = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL_API + '/article/find/' + slug
    ).then((res) => res.json());

    return {
      title: 'Article - ' + article.data.title,
      description: article.data.title,
      keywords: [`${article.data.author.name}`, ...keywords],
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'This article does not exist.',
      keywords: keywords,
    };
  }
}

async function getArticle(slug: string) {
  try {
    const data = await findArticle(slug);
    return data;
  } catch (error) {
    return undefined;
  }
}

export default async function Page({ params }: Props) {
  const article = await getArticle(params.slug);
  const session = await getServerSession();
  if (!article) return redirect('/');

  return (
    <div className="pt-[60px] mx-6 sm:max-w-2xl sm:mx-auto">
      <ShowArticle data={article} />
      <Separator />
      <Comments session={session} />
    </div>
  );
}
