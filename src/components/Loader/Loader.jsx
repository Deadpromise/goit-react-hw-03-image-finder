import { ThreeCircles } from 'react-loader-spinner';
import { LoaderEl } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderEl>
      <ThreeCircles
        height="100"
        width="100"
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </LoaderEl>
  );
};
