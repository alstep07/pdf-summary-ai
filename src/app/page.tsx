import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/header";
import { FileUploadForm } from "@/components/pdf/file-upload-form";
import { Footer } from "@/components/layout/footer";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Home() {
  const footerLinks = [
    {
      href: "https://github.com/alstep07/pdf-summary-ai",
      label: "GitHub",
      icon: <SiGithub className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 w-full max-w-2xl">
        <PageHeader
          title="PDF Summary AI"
          description="Upload a PDF file to generate a summary"
        />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-2xl">
        <Card>
          <FileUploadForm />
        </Card>
      </main>
      <Footer links={footerLinks} className="row-start-3" />
    </div>
  );
}
