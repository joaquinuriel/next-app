import Image from "next/image";
import Layout from "components/layout";
import { useAuth } from "src/auth";
// import photo from auth.user!.providerData

export default function User() {
  const auth = useAuth();
  const UserUI = () => (
    <Layout>
      <h1>{auth.user?.displayName}</h1>
      <Image src={auth.user!.photoURL!} width={48} height={48} />
      <pre>{JSON.stringify(auth.user!.providerData[0], null, 1)}</pre>
    </Layout>
  );
  const FormUI = () => (
    <Layout>
      <form>
        <fieldset>
          <input type="email" />
          <input type="password" />
        </fieldset>
      </form>
    </Layout>
  );
  return auth.user ? <UserUI /> : <FormUI />;
}
