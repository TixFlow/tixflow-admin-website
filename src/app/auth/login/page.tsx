import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import cover from "@public/cover.png";
import { Form } from "@/components/ui/form";
import LoginForm from "@/app/auth/login/components/login-form";
import Logo from "@/components/logo";

export default function LoginPage() {
  return (
    <Card className="w-full grid grid-cols-2 gap-0 p-0 overflow-hidden">
      <CardContent className="w-full p-0">
        <Image src={cover} alt="Cover photo" className="w-full h-auto" />
      </CardContent>
      <CardContent className="w-full bg-blue-50 px-20 py-32">
        <div className=" w-full h-full grid grid-cols-1">
          <Logo classname="w-full h-fit mx-auto mt-5" />
          <CardTitle className="w-full h-fit text-4xl font-bold text-black text-center">
            Login to continue...
          </CardTitle>
          <LoginForm />
        </div>
      </CardContent>
    </Card>
  );
}
