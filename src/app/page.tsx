import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';

import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { FileUploadForm } from "@/components/pdf/file-upload-form";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const footerLinks = [
    {
      href: "https://github.com/alstep07/pdf-summary-ai",
      label: "GitHub",
      icon: <SiGithub className="h-4 w-4" />
    },
    {
      href: "https://www.linkedin.com/in/alstep07/",
      label: "Linkedin",
      icon: <SiLinkedin className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Card>
          <Header />
          <FileUploadForm />
        </Card>
      </main>
      <Footer
        links={footerLinks}
        className="row-start-3"
      />
    </div>
  );
}
