import { NextPage, NextPageContext } from 'next';
import Create from '../components/Create';
import Title from '../types/Title';

interface PageProps {
  initialTitle: Title;
}
interface Context extends NextPageContext {
  query: {
    titleId: string;
  };
}

const EditTitle: NextPage<PageProps> = ({ initialTitle }) => (
  <Create initialTitle={initialTitle} />
);

export async function getServerSideProps(context: Context) {
  const { titleId } = context.query;

  if (!process.env.APP_URL) {
    throw Error(
      'App URL is not present, make sure to set it in your environment variables.'
    );
  }

  const fetchTitle = async (titleId: string) => {
    const response = await fetch(
      process.env.APP_URL + '/api/titles/' + titleId
    );
    const title = await response.json();
    return title;
  };

  return {
    props: {
      initialTitle: titleId ? await fetchTitle(titleId) : null,
    }, // will be passed to the page component as props
  };
}

export default EditTitle;
