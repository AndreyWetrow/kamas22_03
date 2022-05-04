import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

// const WithSuspense = (Component) => {
//   return (props) => {
//     return (
//       <Suspense fallback={<Preloader />}>
//         <Component {...props} />
//       </Suspense>
//     );
//   };
// };

function WithSuspense(Component) {
  return (
    <Suspense fallback={<Preloader />}>
      <Component />
    </Suspense>
  );
}

// export default MyComponent;
export default WithSuspense;

// export function WithSuspense(Component) {
//   return (props) => <Component {...props} />;
// }
