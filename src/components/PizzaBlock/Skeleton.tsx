import ContentLoader from 'react-content-loader';
import { FC } from 'react';

const Skeleton: FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466.8}
    viewBox="0 0 280 466.8"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="125" r="125" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" />
    <rect x="128" y="414" rx="22" ry="22" width="152" height="45" />
    <rect x="0" y="420" rx="10" ry="10" width="90" height="27" />
  </ContentLoader>
);

export default Skeleton;
