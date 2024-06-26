import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { formatPhoneNumber } from "@/utils/phoneUtils";

const Home = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      phonenumber: "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formattedPhoneNumber = formatPhoneNumber(data.phonenumber);

      const res = await fetch("http://localhost:5000/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formattedPhoneNumber,
          amount: data.amount,
        }),
      });
      const responseData = await res.json();

      toast({
        title: "STK Push Initiated",
        description: (
          <pre className="mt-4 rounded-md bg-gray-800 p-4">
            <code className="text-green-300">
              🎉 Congratulations! <br />
              You should now receive an M-Pesa STK push <br/>
              on your phone to confirm payment.
            </code>
          </pre>
        ),
      });
      
      
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to initiate STK push",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="text-center my-4">
          Please make your Safaricom M-Pesa payment below
        </div>
        <div className="max-w-lg mx-auto p-6 border border-gray-500 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your M-Pesa registered phone number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter amount to send" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the amount in Kenyan Shillings
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Send</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
