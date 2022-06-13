import React, {FC} from "react"
import ContentLoader from "react-content-loader"

const Skeleton: FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="280" rx="10" ry="10" width="280" height="23" />
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="319" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="426" rx="10" ry="10" width="125" height="33" />
    <rect x="142" y="420" rx="20" ry="20" width="138" height="45" />
  </ContentLoader>
)

export default Skeleton;