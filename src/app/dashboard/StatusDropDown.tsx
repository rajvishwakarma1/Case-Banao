"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
enum OrderStatus {
  fullfilled,
  shipped,
  awaiting_shipment,
}
const LABEL_MAP: Record<string, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fullfilled: "Fullfilled",
  shipped: "Shipped",
};

const StatusDropDown = ({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: string;
}) => {
  const {toast} = useToast();
  const router = useRouter();
  const updateStatus = async (newStatus: string) => {
    const res = await axios.post("/api/admin/updateStatus", {
      orderId: id,
      newStatus: newStatus,
    });
    if (res.status === 200) {
      router.refresh();
    } else {
      toast({
        title: "Can't update the status",
        description: "Error updating status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus)
          .filter((key) => isNaN(Number(key)))
          .map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => {
                updateStatus(status);
              }}
              className={cn(
                "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
                { "bg-zinc-100": orderStatus === status }
              )}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4 text-primary",
                  orderStatus === status ? "opacity-100" : "opacity-0"
                )}
              />
              {LABEL_MAP[status]}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
