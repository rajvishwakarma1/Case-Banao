import connectDB from "@/lib/connectDB";
import Configuration from "@/models/configuration.model";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
    searchParams:{
        [key:string]:string | string[] | undefined
    }
}
const Page = async ({searchParams}:PageProps) => {
    const {id} = searchParams;
    if(!id || typeof id !== "string"){
        return notFound();
    } 

    await connectDB()
    const configuration = await Configuration.findOne({_id:id});
    if(!configuration) notFound();
  return <DesignPreview config={configuration}/>;
};

export default Page;
