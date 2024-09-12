import type {Metadata} from "next";
import '@/styles/globals.scss';
import {getAllMenus} from '@/utils/lib/menus';
import {getSiteoptions} from "@/utils/lib/siteoptions";

// components
import Layout from '@/components/Layout';

// Contexts
import {
  setMenusContext,
  setSiteOptionsContext,
  setSidePostsContext,
} from "@/utils/hooks/ServerContext";
import {getSidePosts} from "@/utils/lib/posts";
import {ApolloWrapper} from "@/components/ApolloWrapper";
import {NavbarProvider} from "@/utils/hooks/NavbarProvider";
import NextTopLoader from 'nextjs-toploader';

const {menus = []} = await getAllMenus();
const settings = await getSiteoptions();
const {sidePosts} = await getSidePosts();

export const metadata: Metadata = {
  title: "Thats not my neighbor",
  description: "Thats not my neighbor",
  verification: {
    google: "zVS51G9qsrXjF_p5P-xZD1xC1HtpsPypwR0o1pqtXkU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  setMenusContext(menus);
  setSiteOptionsContext(settings);
  setSidePostsContext(sidePosts);

  return (
    <html lang="en">
    <body>
    <NavbarProvider>
      <ApolloWrapper>
        <NextTopLoader
          color="var(--app-color-accent)"
          height={4}
        />
        <Layout>
          {children}
        </Layout>
      </ApolloWrapper>
    </NavbarProvider>
    </body>
    </html>
  );
}
