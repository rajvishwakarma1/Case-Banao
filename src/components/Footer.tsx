import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-white h-20 relative dark:bg-gray-900">
      <div className="border-t border-gray-200 dark:border-gray-600" />
      <MaxWidthWrapper>
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center 1E293Amd:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
                <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300">Terms</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300">Privacy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-3g00">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
