import { getServerSession } from '@/hooks/sessions';

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    <p className="text-secondary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
      accusamus aperiam omnis iusto explicabo. Quisquam reprehenderit explicabo
      laborum sunt, itaque obcaecati quam fuga ratione non! Odio dignissimos
      rerum repudiandae modi.
    </p>
  );
}
