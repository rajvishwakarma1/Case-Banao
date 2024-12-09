import connectDB from "@/lib/connectDB";
import Configuration from "@/models/configuration.model";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }
  connectDB();
  const configuration = await Configuration.findById(id);
  if (!configuration) return notFound();
  const { imageUrl, width, height } = configuration;
  return (
    <div>
      <DesignConfigurator
        configId={id.toString()}
        imageUrl={imageUrl}
        imageDimensions={{ height, width }}
      />
    </div>
  );
};

export default Page;
