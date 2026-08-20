import { redirect } from "next/navigation";
import Stripe from "stripe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export default async function WelcomePage(props: PageProps<"/partner/welcome">) {
  const searchParams = await props.searchParams;
  const sessionId =
    typeof searchParams.session_id === "string"
      ? searchParams.session_id
      : undefined;

  if (!sessionId) redirect("/partner");

  let customerName = "";
  let centerName = "";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") redirect("/partner");

    customerName = (session.metadata?.customerName as string) || "";
    centerName = (session.metadata?.centerName as string) || "";
  } catch {
    redirect("/partner");
  }

  return (
    <>
      <Navbar links={[{ label: "Home", href: "/" }]} />
      <main>
        <section className="welcome-hero">
          <div className="wrap">
            <div className="welcome-card">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h1>You&rsquo;re in{customerName ? `, ${customerName}` : ""}.</h1>
              <p>
                {centerName ? (
                  <>
                    Welcome to the Presently pilot for{" "}
                    <strong>{centerName}</strong>. We&rsquo;ll send setup
                    instructions to your email within 24 hours.
                  </>
                ) : (
                  <>
                    Welcome to the Presently pilot. We&rsquo;ll send setup
                    instructions to your email within 24 hours.
                  </>
                )}
              </p>
              <a href="/" className="btn btn-primary btn-lg">
                Back to home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
