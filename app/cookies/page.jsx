export const metadata = {
  title: "Cookie Policy | HOGONN India",
  description:
    "Learn how HOGONN India uses cookies and manage your cookie preferences.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-[1000px]">

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-red-500">
          HOGONN India
        </p>

        <h1 className="mb-8 text-4xl font-semibold md:text-6xl">
          Cookie Policy
        </h1>

        <div className="space-y-10 text-white/70">

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              What are cookies?
            </h2>

            <p className="leading-7">
              Cookies are small text files stored on your device when
              you visit a website. They help websites remember your
              preferences and understand how visitors use the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              How we use cookies
            </h2>

            <p className="leading-7">
              HOGONN may use cookies to help operate the website,
              improve website performance, understand visitor
              interactions and provide a better browsing experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Types of cookies
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Necessary Cookies
                </h3>

                <p className="leading-7">
                  These cookies are required for certain website
                  functionality and cannot normally be disabled.
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Analytics Cookies
                </h3>

                <p className="leading-7">
                  These cookies help us understand how visitors use
                  our website and help us improve its performance.
                </p>
              </div>

              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Preference Cookies
                </h3>

                <p className="leading-7">
                  These cookies may be used to remember preferences
                  and improve your experience on the website.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Managing your cookie preferences
            </h2>

            <p className="leading-7">
              When you first visit our website, you can choose to
              accept or decline non-essential cookies using the cookie
              consent banner. You can also manage cookies through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              Contact us
            </h2>

            <p className="leading-7">
              If you have questions about our use of cookies, please
              contact HOGONN India Pvt. Ltd.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}