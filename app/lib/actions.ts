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

    // Zod already throws an error if the customer field is empty as it expects a type string. 
    customerId: z.string({
      invalid_type_error: 'Please select a customer',
    }),
    // The amount field is set to coerce (change) from a string to a number while also validating its type. gt - check for (greater than 0) as 0 will be the default, and therefore a valid value.
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    date: z.string(),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select a status',
    }),
});



// CREATE

// using omit method to only keep certain keys
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// createinvoice function takes in data, expecting type: FormData

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// prevState - contains the state passed from the useFormState hook in create-form. (not used here but is a required prop.)
export async function createInvoice(prevState: State, formData: FormData) {

  // safeParse() will return an object containing either a success or error.
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
    console.log(validatedFields);


    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch(error) {
      console.error(error);
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }

    // Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices')
  }




// UPDATE
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// exported function imported into edit form - fired when edit form is submit.
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  // update db with updated values if id's match.
  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch(error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// DELETE
export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
  } catch(error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
}