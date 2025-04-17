import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import { LoaderCircle } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center absolute z-10 bg-yellow-500 top-0 left-0">
      <Card className="container">
        <CardHeader className="grid place-items-center">
          <Logo />
        </CardHeader>
        <CardContent className="grid place-items-center gap-5">
          <CardTitle className="text-center text-2xl font-medium text-muted-foreground">
            Content is loading, please wait...
          </CardTitle>
          <LoaderCircle className="w-32 h-32 text-yellow-500 animate-spin" />
        </CardContent>
        <CardFooter className="grid place-items-center"></CardFooter>
      </Card>
    </div>
  );
}
