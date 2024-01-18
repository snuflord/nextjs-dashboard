import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers , fetchInvoiceById} from '@/app/lib/data';
import { notFound } from 'next/navigation';

// app/dashboard/invoices/[id]/edit/page.tsx

export default async function Page({ params }: { params: {id: string} }) {

    const id = params.id;
    // make both requests in parallel with Promise.all
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        // all customers
        fetchCustomers(),
    ])

    if(!invoice) {
        // not found will fire if no invoices match the id, rendering the not-found tsx file.
        notFound();
    }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* this EDIT form is pre populated with the information based on the id */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
