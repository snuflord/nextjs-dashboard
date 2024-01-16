// By adding the 'use server', you mark all the exported functions within the file as server functions. These server functions can then be imported into Client and Server components, making them extremely versatile.

'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";

// Next.js has a Client-side Router Cache that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.
// Since we're updating the data displayed in the invoices route, we need to clear this cache and trigger a new request to the server. We can do this with the revalidatePath function from Next.js:

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// we're matching the type to those defined in definitions Invoice schema. 
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    // The amount field is set to coerce (change) from a string to a number while also validating its type.
    amount: z.coerce.number(),
    date: z.string(),
    status: z.enum(['pending', 'paid']),
});
// using omit method to only keep certain keys
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// createinvoice function takes in data, expecting type: FormData

export async function createInvoice(formData: FormData) {


    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });


    const amountInCents = amount * 100;
    // splitting time from first index.
    const date = new Date().toISOString().split('T')[0];

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices')
  }
