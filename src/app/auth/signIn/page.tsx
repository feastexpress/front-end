import { FormSignIn } from './_components/form';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[500px] px-11 py-12 rounded-lg shadow-lg gap-3 flex flex-col">
        <h2 className="mt-6 text-4xl font-extrabold text-gray-900 p-4 text-center">
          Falta pouco para matar sua fome!
        </h2>
        <FormSignIn />
      </div>
    </div>
  );
}