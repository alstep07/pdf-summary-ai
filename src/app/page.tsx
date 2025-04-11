import { SiGithub } from "@icons-pack/react-simple-icons";

import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { FileUploadForm } from "@/components/pdf/file-upload-form";
import { Footer } from "@/components/layout/footer";
import { BaseLayout } from "@/components/layout/base-layout";

export default function Home() {
  const footerLinks = [
    {
      href: "https://github.com/alstep07/pdf-summary-ai",
      label: "GitHub",
      icon: <SiGithub className="h-4 w-4" />,
    },
  ];

  return (
    <BaseLayout>
      <Card>
        <Header />
        <FileUploadForm />
      </Card>
      <Footer links={footerLinks} className="row-start-3" />
    </BaseLayout>
  );
}
