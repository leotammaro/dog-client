import React from "react";
import ContentLoader from "react-content-loader";

function StructureLoader() {
  return (
    <ContentLoader
      speed={2}
      width={850}
      height={550}
      viewBox="0 0 850 550"
      backgroundColor="#ebebeb"
      foregroundColor="#ffffff"
    >
      <rect x="189" y="95" rx="0" ry="0" width="1" height="2" />
      <rect x="4" y="10" rx="0" ry="0" width="596" height="24" />
      <rect x="2" y="50" rx="0" ry="0" width="356" height="600" />
      <rect x="384" y="53" rx="0" ry="0" width="217" height="20" />
      <rect x="385" y="83" rx="0" ry="0" width="185" height="20" />
      <rect x="385" y="112" rx="0" ry="0" width="185" height="20" />
      <rect x="385" y="144" rx="0" ry="0" width="185" height="20" />
      <rect x="385" y="179" rx="0" ry="0" width="217" height="20" />
      <rect x="386" y="218" rx="0" ry="0" width="185" height="20" />
      <rect x="385" y="252" rx="0" ry="0" width="185" height="20" />
      <rect x="384" y="292" rx="0" ry="0" width="185" height="20" />
    </ContentLoader>
  );
}

export default StructureLoader;
