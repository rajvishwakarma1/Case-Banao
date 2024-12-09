import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/lib/connectDB";
import { formatPrice } from "@/lib/utils";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import ShippingAddress from "@/models/shipping-address.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import StatusDropDown from "./StatusDropDown";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email != ADMIN_EMAIL) return notFound();

  connectDB();
  const orders = await Order.find({
    isPaid: true,
    createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
  })
    .sort({ createdAt: -1 })
    .populate("shippingAddress");

  const ordersWithUserDetails = [];

  for (let order of orders) {
    const user = await User.findById(order.userId);
    ordersWithUserDetails.push({ order, userDetails: user });
  }

  const result = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
        isPaid: true,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
  const lastWeekSum = result[0]?.totalAmount || 0;
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const resultLastMonth = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: oneMonthAgo },
        isPaid: true,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  const lastMonthSum = resultLastMonth[0]?.totalAmount || 0;
  const WEEKLY_GOAL = 5000;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)}
                </div>
                <CardFooter>
                  <Progress value={(lastWeekSum / WEEKLY_GOAL) * 100} />
                </CardFooter>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL * 4)}
                </div>
                <CardFooter>
                  <Progress value={(lastMonthSum / (WEEKLY_GOAL * 4)) * 100} />
                </CardFooter>
              </CardContent>
            </Card>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Incoming Orders</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase Date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersWithUserDetails.map((order) => (
                <TableRow key={order.order._id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      {order.order.shippingAddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground sm:inline">
                      {order.userDetails?.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropDown
                      id={order.order.id}
                      orderStatus={order.order.status}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;
