'use client';

import { ClientWrapper } from '@/components/ui/client-wrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'Do you require a prescription?',
    answer:
      'A prescription is not required. Please consult a Health Care Provider before taking this or that medicine. It is important to take into consideration some contra-indications or diseases a patient may have. Only a specialist can prescribe the exact medication and the required dosage.',
  },
  {
    question: 'What are your shipping methods?',
    answer: `Currently we offer:
- The Airmail standard waiting period for the given shipping type lasts 2-3 weeks. Some packages may be delivered faster.
- EMS Courier Delivery. The waiting period for the given shipping type is 3-8 business days. However, the delivery can take a little longer because of the possible delays at customs. Unfortunately it doesn't depend on our delivery service.`,
  },
  {
    question: 'What medication do you offer?',
    answer:
      "Our pharmacy sells generic and brand name medicine. One can easily tell the difference between these types of medication on our site. Brand name products are marked with the word 'brand' in their names. Generic medications don't have this mark in their names. The offered medication is of high quality.",
  },
  {
    question: 'How can one place an order?',
    answer:
      "You can place an order on our site - it is fast and easy. You choose a product you want and add it to the cart. Then you press the checkout button. You'll find yourself on the billing page, where you'll have to fill in all the necessary fields.",
  },
  {
    question: 'What are your available payment methods?',
    answer:
      'We accept debit and credit cards such as Visa, MasterCard, E-Checks. Moreover, we have SEPA and crypto-transfers.',
  },
  {
    question: 'How fast will my credit card be charged?',
    answer:
      'When a «Complete your order» button is pressed, the data is transmitted to our processing centre where we check all the info. Then we charge a credit card. When the attempted charge is approved by the bank your order will receive the following status: Approved. You will receive a confirmation email (sent to the indicated email address) once your order is processed and approved.',
  },
  {
    question: 'What should I do if an order has been made and I see no charge on my credit card?',
    answer: `That means that we were unable to charge your credit card for some reason.
-Please call your bank to sort out the problem. Your bank may prohibit international charges for reasons of safety.
-Please check whether the filled data is correct (billing address, CVV code and the expiry date).
Please reorder once all the info has been checked.`,
  },
  {
    question: 'Is it secure to give my credit card info on your site?',
    answer:
      "The protection of credit card details is the question of major importance to us. We've been in this business for a long time and have a lot of satisfied customers. That is why we pay much attention to privacy and security of our customers. We guarantee the highest level of protection when your credit card information is processed. On our billing page we use SSL (Secure Sockets Layer). It absolutely guarantees its security. Our online order system uses the latest security encryption technology. Thus our clients can be sure that their personal data is properly protected.",
  },
  {
    question: 'Do all brand-name medications have their generic versions?',
    answer:
      'No unfortunately. A manufacturer can produce a generic drug only after the brand-name drug patent expires. As soon as a patent is expired, not every manufacturer decides to make a generic version of a particular drug. Only half of all brand medications have their generic analogues.',
  },
  {
    question: 'How can one be sure of the quality of the drugs you sell?',
    answer:
      'High quality of the products is the matter of major importance to every seller. Our pharmacy sells only high-quality products. The better the quality of a product is, the more clients we have. It is as simple as that. Thus we choose only reliable suppliers who provide us with all the necessary documentation and thoroughly test the quality of every drug.',
  },
  {
    question: 'Is there any difference between the following dosages: Viagra 50 mg and 100 mg?',
    answer:
      'A 50mg pill of Viagra contains 50 mg of active ingredient (Sildenafil concentrate) and a 100mg Viagra pill contains 100mg of Sildenafil. A 50mg pill is the standard dose used to achieving the desired effect. It is important to take into consideration that the effect may vary for different people. One can begin with a 25mg pill (you can divide a 50mg pill in two pieces). Therefore one can decide if it is enough. One can take a 50mg pill if the desired effect is not reached.',
  },
  {
    question: 'What is the difference between Soft and Regular pills?',
    answer:
      'The zone of absorption and the speed of action differ in these types of pills. Soft pills are believed to act quicker than the Regular ones. One can eat fatty food or take alcohol when taking Soft pills. They dissolve under the tongue. Please keep in mind that drinking is not recommended when taking regular pills.',
  },
  {
    question:
      'What should I do if the package was damaged during transportation and some products are missing?',
    answer:
      'Please contact our customer care department ASAP. We will do our best to satisfy our customers. We will either resend the package at no expense or issue a refund.',
  },
  {
    question: 'What is the shelf life of the products you offer?',
    answer:
      'You will see the expiry date on the blister. It is indicated on each blister. The average shelf life is usually 2 years (from the date of production). However the expiry date may differ for various medications.',
  },
  {
    question: 'What should I do if there is no required dosage?',
    answer: `If you need a 50 mg pill and we sell only 100 mg of a certain medication, you may divide a pill into two pieces.
If you need a 25 mg pill and we have only 100 mg of a certain medication, you may divide a pill into 4 pieces (or a 50 mg pill into 2 parts).
The situation may differ:
If you need a100 mg pill and we are offering only a 50 mg pill, you may take two 50 mg pills.`,
  },
  {
    question: "What are my options if I haven't received my package yet?",
    answer:
      "We kindly ask you to check your shipping method first of all (Airmail's waiting period lasts 2-3 business weeks). Please bear in mind that the delivery can take a little longer because of the possible delays at customs.",
  },
];

export default function FAQPage() {
  return (
    <ClientWrapper>
      <div className="p-6">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-none relative">
              <AccordionTrigger className="flex w-full p-4 text-left bg-[#f8fcfc] hover:bg-[#f8fcfc] hover:no-underline">
                <span className="text-[#00bcd4] font-normal flex-1 pr-8">{faq.question}</span>
                <div className="absolute right-4 top-4">
                  <Plus className="h-5 w-5 text-[#ff6b6b] transition-transform duration-200 group-data-[state=open]:rotate-45" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-[#7a7a7a]">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ClientWrapper>
  );
}
