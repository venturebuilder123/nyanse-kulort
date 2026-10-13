import { currentBrand } from "./brand";
import Landing from "./Landing";
import Split from "./Split";

export default async function Page() {
  // shared domain, no brand picked yet: the split choice; brand domains and ad links go straight in
  const { chosen } = await currentBrand();
  return chosen ? <Landing /> : <Split />;
}
